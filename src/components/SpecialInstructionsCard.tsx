import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SpecialInstructionsCardProps {
  instructions: string | null | undefined;
  compact?: boolean;
  className?: string;
}

const SpecialInstructionsCard = ({
  instructions,
  compact = false,
  className = "",
}: SpecialInstructionsCardProps) => {
  if (!instructions || instructions.trim().length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center gap-1">
          <MessageSquare className="w-3 h-3" />
          Observações
        </Badge>
      </div>
    );
  }

  return (
    <Card className={`p-4 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 shadow-md ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-orange-900 mb-1">
            Observações do Pedido
          </p>
          <p className="text-sm text-orange-800 whitespace-pre-wrap break-words leading-relaxed">
            {instructions.trim()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SpecialInstructionsCard;
