-- Add special_instructions column to orders table
ALTER TABLE public.orders
ADD COLUMN special_instructions TEXT;

-- Add comment
COMMENT ON COLUMN public.orders.special_instructions IS 'Special instructions or notes from the customer for the kitchen';
