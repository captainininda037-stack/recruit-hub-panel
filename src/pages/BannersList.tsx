import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BannersList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [banners] = useState([
    {
      id: 1,
      type: "top",
      imageUrl: "https://via.placeholder.com/1200x200",
      linkUrl: "https://example.com/promo",
      status: "Active",
      createdDate: "2024-01-15"
    },
    {
      id: 2,
      type: "bottom",
      imageUrl: "https://via.placeholder.com/1200x200",
      linkUrl: "https://example.com/offer",
      status: "Active",
      createdDate: "2024-01-14"
    }
  ]);

  const handleDelete = (id: number, type: string) => {
    toast({
      title: "Banner Deleted",
      description: `${type} banner has been removed.`
    });
  };

  const topBanners = banners.filter(b => b.type === "top");
  const bottomBanners = banners.filter(b => b.type === "bottom");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Banners</h1>
          <p className="text-muted-foreground">Manage top and bottom banner advertisements</p>
        </div>
        <Button 
          onClick={() => navigate("/banners/new")}
          className="gradient-primary shadow-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      {/* Top Banners */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Top Banners</CardTitle>
          <CardDescription>Banners displayed at the top of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {topBanners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No top banners added yet</p>
            </div>
          ) : (
            topBanners.map((banner) => (
              <div key={banner.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <img
                      src={banner.imageUrl}
                      alt="Top banner"
                      className="w-full h-24 object-cover rounded border"
                    />
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="w-3 h-3" />
                      <a 
                        href={banner.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {banner.linkUrl}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="default">Active</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/banners/edit/${banner.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(banner.id, "Top")}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Bottom Banners */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Bottom Banners</CardTitle>
          <CardDescription>Banners displayed at the bottom of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {bottomBanners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No bottom banners added yet</p>
            </div>
          ) : (
            bottomBanners.map((banner) => (
              <div key={banner.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <img
                      src={banner.imageUrl}
                      alt="Bottom banner"
                      className="w-full h-24 object-cover rounded border"
                    />
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="w-3 h-3" />
                      <a 
                        href={banner.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {banner.linkUrl}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="default">Active</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/banners/edit/${banner.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(banner.id, "Bottom")}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BannersList;
