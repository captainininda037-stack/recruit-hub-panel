import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PremiumPostersList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [posters] = useState([
    {
      id: 1,
      title: "Special Promotion",
      imageUrl: "https://via.placeholder.com/400x600",
      displayOnLaunch: true,
      status: "Active",
      createdDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Featured Offer",
      imageUrl: "https://via.placeholder.com/400x600",
      displayOnLaunch: false,
      status: "Active",
      createdDate: "2024-01-14"
    }
  ]);

  const handleDelete = (id: number, title: string) => {
    toast({
      title: "Poster Deleted",
      description: `"${title}" has been removed.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Premium Posters</h1>
          <p className="text-muted-foreground">Manage promotional posters displayed on app launch</p>
        </div>
        <Button 
          onClick={() => navigate("/premium-posters/new")}
          className="gradient-primary shadow-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Poster
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardDescription>Total Posters</CardDescription>
            <CardTitle className="text-3xl">{posters.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardDescription>Display on Launch</CardDescription>
            <CardTitle className="text-3xl">
              {posters.filter(p => p.displayOnLaunch).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Posters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posters.length === 0 ? (
          <Card className="dashboard-card col-span-full">
            <CardContent className="text-center py-12">
              <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No premium posters added yet</p>
            </CardContent>
          </Card>
        ) : (
          posters.map((poster) => (
            <Card key={poster.id} className="dashboard-card overflow-hidden">
              <div className="relative">
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className="w-full h-64 object-cover"
                />
                {poster.displayOnLaunch && (
                  <Badge className="absolute top-2 right-2 bg-primary">
                    <Star className="w-3 h-3 mr-1" />
                    Launch Display
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{poster.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      Created: {poster.createdDate}
                    </CardDescription>
                  </div>
                  <Badge variant="default">{poster.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/premium-posters/edit/${poster.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(poster.id, poster.title)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PremiumPostersList;
