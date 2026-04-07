import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderNotesDialogProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  maxLength?: number;
  triggerClassName?: string;
  showBadge?: boolean;
}

const OrderNotesDialog = ({
  notes,
  onNotesChange,
  maxLength = 500,
  triggerClassName = "",
  showBadge = true,
}: OrderNotesDialogProps) => {
  const [open, setOpen] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > maxLength) {
      return;
    }

    setLocalNotes(value);

    if (value.length > maxLength) {
      setError(`Observações não podem exceder ${maxLength} caracteres`);
    } else {
      setError(undefined);
    }
  };

  const handleSave = () => {
    if (!error) {
      onNotesChange(localNotes);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setLocalNotes(notes);
    setError(undefined);
    setOpen(false);
  };

  const remainingChars = maxLength - localNotes.length;
  const isNearLimit = remainingChars <= 50;
  const isAtLimit = remainingChars <= 0;
  const hasNotes = localNotes.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`relative gap-2 border-2 hover:border-purple-400 hover:bg-purple-50 transition-all ${triggerClassName}`}
          aria-label="Adicionar observações do pedido"
        >
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <span className="hidden sm:inline">Observações</span>
          {showBadge && hasNotes && (
            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-0 text-xs font-bold">
              ✓
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            Observações do Pedido
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Notes Input */}
          <div className="space-y-2">
            <label
              htmlFor="special-notes"
              className="text-sm font-semibold text-gray-700"
            >
              Instruções Especiais
            </label>
            <Textarea
              id="special-notes"
              placeholder="Ex: Açaí sem granola, adicionar mel extra, sem leite condensado..."
              value={localNotes}
              onChange={handleNotesChange}
              className={`min-h-[120px] resize-none border-2 focus:border-orange-500 ${
                error ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? "notes-error" : "notes-help"}
              maxLength={maxLength}
            />

            {error ? (
              <p
                id="notes-error"
                className="text-sm font-medium text-red-600 flex items-center gap-1"
              >
                <span>⚠️</span> {error}
              </p>
            ) : (
              <div
                id="notes-help"
                className="flex justify-between items-center text-sm text-gray-600"
              >
                <span>Adicione instruções especiais para a cozinha</span>
                <span
                  className={`font-semibold ${
                    isAtLimit
                      ? "text-red-600"
                      : isNearLimit
                        ? "text-orange-600"
                        : "text-gray-600"
                  }`}
                >
                  {remainingChars}
                </span>
              </div>
            )}
          </div>

          {/* Preview Card */}
          {hasNotes && (
            <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
              <p className="text-xs font-semibold text-orange-900 mb-2 flex items-center gap-1">
                <span>📝</span> Prévia das observações:
              </p>
              <p className="text-sm text-orange-800 whitespace-pre-wrap leading-relaxed">
                {localNotes.trim()}
              </p>
            </Card>
          )}

          {/* Character Count Progress */}
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isAtLimit
                    ? "bg-red-500"
                    : isNearLimit
                      ? "bg-orange-500"
                      : "bg-gradient-to-r from-purple-500 to-indigo-500"
                }`}
                style={{
                  width: `${Math.min((localNotes.length / maxLength) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-600 text-center">
              {localNotes.length} / {maxLength} caracteres
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 border-2"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!!error}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold"
            >
              Salvar Observações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderNotesDialog;
