
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FamilyTree = () => {
  return (
    <div className="space-y-6">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Family Tree</h1>
        <p className="text-muted-foreground">
          Explore your family connections and heritage
        </p>
      </section>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Family Tree Visualization</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">
            Family tree visualization will be implemented in the next iteration
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyTree;
