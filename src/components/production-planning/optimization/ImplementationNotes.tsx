
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImplementationNotesProps {
  production: number[];
}

const ImplementationNotes = ({ production }: ImplementationNotesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Implementation Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertDescription>
            <p className="mb-2">The Wagner-Whitin algorithm has determined the following optimal production plan:</p>
            <ul className="list-disc pl-5 space-y-1">
              {production.map((prod, idx) => 
                prod > 0 && (
                  <li key={idx}>
                    Produce <strong>{prod}</strong> units in Period {idx + 1}
                  </li>
                )
              )}
            </ul>
            <p className="mt-2">
              This plan minimizes the total cost of production setup and inventory holding across all periods.
            </p>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ImplementationNotes;
