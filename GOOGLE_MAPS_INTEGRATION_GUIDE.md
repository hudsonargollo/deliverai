# Google Maps Integration Guide

**Date**: April 7, 2026
**Status**: READY FOR IMPLEMENTATION
**Priority**: HIGH

---

## 📋 Overview

This guide explains how to integrate Google Maps API for address search functionality in the order flow. The feature allows customers to search for addresses by street name (logradouro) and automatically populate address fields.

---

## 🔑 Step 1: Get Google Maps API Key

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name: `coloridoacai` or similar
4. Click "Create"
5. Wait for project to be created

### 1.2 Enable Required APIs

1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for and enable these APIs:
   - **Google Maps JavaScript API** - For map display
   - **Places API** - For address autocomplete
   - **Geocoding API** - For converting addresses to coordinates

### 1.3 Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key
4. Click "Edit API Key" to restrict it:
   - **Application restrictions**: HTTP referrers (websites)
   - **Add referrer**: `coloridoacai.clubemkt.digital`
   - **Add referrer**: `*.coloridoacai.pages.dev`
   - **API restrictions**: Select the 3 APIs enabled above
5. Save the key

### 1.4 Add API Key to Environment

Add to `.env`:
```
VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

Add to `wrangler.toml`:
```toml
[vars]
VITE_GOOGLE_MAPS_API_KEY = "YOUR_API_KEY_HERE"
```

---

## 📦 Step 2: Install Required Libraries

```bash
npm install @react-google-maps/api
```

---

## 🔧 Step 3: Create Google Maps Service

Create `src/integrations/google-maps/service.ts`:

```typescript
export interface PlacePrediction {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text: string;
}

export interface PlaceDetails {
  formatted_address: string;
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const searchPlaces = async (query: string): Promise<PlacePrediction[]> => {
  if (!query || query.length < 3) return [];

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${API_KEY}&components=country:br&language=pt-BR`
    );

    if (!response.ok) throw new Error('Failed to search places');

    const data = await response.json();
    return data.predictions || [];
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
};

export const getPlaceDetails = async (placeId: string): Promise<PlaceDetails | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}&language=pt-BR`
    );

    if (!response.ok) throw new Error('Failed to get place details');

    const data = await response.json();
    return data.result || null;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};

export const parseAddressComponents = (components: PlaceDetails['address_components']) => {
  const address: Record<string, string> = {};

  components.forEach(component => {
    if (component.types.includes('route')) {
      address.endereco = component.long_name;
    }
    if (component.types.includes('street_number')) {
      address.numero = component.long_name;
    }
    if (component.types.includes('administrative_area_level_2')) {
      address.bairro = component.long_name;
    }
    if (component.types.includes('administrative_area_level_1')) {
      address.cidade = component.long_name;
    }
    if (component.types.includes('postal_code')) {
      address.cep = component.long_name;
    }
  });

  return address;
};
```

---

## 🎨 Step 4: Create Google Maps Search Component

Create `src/components/GoogleMapsSearch.tsx`:

```typescript
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, MapPin } from 'lucide-react';
import { searchPlaces, getPlaceDetails, parseAddressComponents } from '@/integrations/google-maps/service';
import { toast } from 'sonner';

interface GoogleMapsSearchProps {
  onAddressSelect: (address: {
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    latitude?: number;
    longitude?: number;
  }) => void;
}

export const GoogleMapsSearch = ({ onAddressSelect }: GoogleMapsSearchProps) => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<any | null>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        const results = await searchPlaces(query);
        setPredictions(results);
        setLoading(false);
      } else {
        setPredictions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectPrediction = async (prediction: any) => {
    setLoading(true);
    try {
      const details = await getPlaceDetails(prediction.place_id);
      if (details) {
        const addressData = parseAddressComponents(details.address_components);
        onAddressSelect({
          ...addressData,
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
        toast.success('Endereço selecionado com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao buscar detalhes do endereço');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o logradouro (rua, avenida, etc)..."
        className="text-base"
      />

      {loading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
        </div>
      )}

      {predictions.length > 0 && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {predictions.map((prediction) => (
            <Card
              key={prediction.place_id}
              className="p-3 cursor-pointer hover:bg-purple-50 transition"
              onClick={() => handleSelectPrediction(prediction)}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">
                    {prediction.main_text}
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    {prediction.secondary_text}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {query.length >= 3 && predictions.length === 0 && !loading && (
        <p className="text-sm text-slate-600 text-center py-4">
          Nenhum endereço encontrado
        </p>
      )}
    </div>
  );
};
```

---

## 🔄 Step 5: Update OrderFlow Component

Update the Map Search Dialog in `src/pages/customer/OrderFlow.tsx`:

```typescript
import { GoogleMapsSearch } from '@/components/GoogleMapsSearch';

// In the DeliveryAddressStep component, replace the Map Search Dialog:

{/* Map Search Dialog */}
<Dialog open={mapSearchOpen} onOpenChange={setMapSearchOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Buscar Endereço</DialogTitle>
    </DialogHeader>
    <GoogleMapsSearch
      onAddressSelect={(address) => {
        setCustomerInfo({
          ...customerInfo,
          ...address,
        });
        setMapSearchOpen(false);
      }}
    />
  </DialogContent>
</Dialog>
```

---

## 🚀 Step 6: Deploy

1. Add API key to environment variables
2. Install dependencies: `npm install @react-google-maps/api`
3. Build: `npm run build`
4. Deploy: `./deploy.sh "feat: Google Maps integration for address search"`

---

## 📊 API Costs

### Pricing (as of 2024)
- **Places API (Autocomplete)**: $0.017 per request
- **Geocoding API**: $0.005 per request
- **Maps JavaScript API**: Free (with usage limits)

### Estimated Monthly Cost
- 1,000 searches/day = ~$510/month
- 100 searches/day = ~$51/month
- 10 searches/day = ~$5.10/month

### Cost Optimization
1. Enable request caching
2. Set daily quota limits
3. Use billing alerts
4. Restrict API key to specific domains

---

## 🔒 Security Best Practices

1. **Restrict API Key**
   - HTTP referrers only
   - Specific domains only
   - Specific APIs only

2. **Environment Variables**
   - Never commit API key to git
   - Use `.env` for local development
   - Use wrangler.toml for production

3. **Rate Limiting**
   - Implement client-side debouncing
   - Add server-side rate limiting
   - Monitor usage

4. **Error Handling**
   - Handle API errors gracefully
   - Show user-friendly messages
   - Log errors for debugging

---

## 🧪 Testing

### Test Cases

1. **Search by street name**
   - Input: "Rua das Flores"
   - Expected: List of matching addresses

2. **Select address**
   - Click on prediction
   - Expected: Address fields populated

3. **Get coordinates**
   - Select address
   - Expected: Latitude/longitude captured

4. **Error handling**
   - Invalid API key
   - Network error
   - No results found

---

## 📝 Implementation Checklist

- [ ] Create Google Cloud project
- [ ] Enable required APIs
- [ ] Create and restrict API key
- [ ] Add API key to `.env`
- [ ] Add API key to `wrangler.toml`
- [ ] Install `@react-google-maps/api`
- [ ] Create Google Maps service
- [ ] Create GoogleMapsSearch component
- [ ] Update OrderFlow component
- [ ] Test address search
- [ ] Test address selection
- [ ] Test error handling
- [ ] Deploy to production
- [ ] Monitor API usage

---

## 🔗 Useful Links

- [Google Cloud Console](https://console.cloud.google.com/)
- [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Geocoding API Documentation](https://developers.google.com/maps/documentation/geocoding/overview)
- [Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript/overview)
- [API Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)

---

## 🎯 Next Steps

1. Get Google Maps API key
2. Add to environment variables
3. Install dependencies
4. Implement Google Maps service
5. Create search component
6. Update OrderFlow
7. Test thoroughly
8. Deploy to production

---

**Status**: READY FOR IMPLEMENTATION
**Estimated Time**: 2-3 hours
**Difficulty**: MEDIUM

