import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft, Upload, ImageIcon } from "lucide-react";

const PremiumPosterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    displayOnLaunch: false,
    image: null as File | null,
    imagePreview: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image smaller than 5MB."
        });
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.title || !formData.imagePreview) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide a title and upload an image."
      });
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: isEdit ? "Poster Updated" : "Poster Created",
      description: isEdit ? "Premium poster has been updated successfully." : "New premium poster has been created successfully."
    });

    navigate("/premium-posters");
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/premium-posters")}
          className="hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posters
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Premium Poster" : "Create New Premium Poster"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? "Update poster details" : "Add a new promotional poster"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Details */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Poster Information</CardTitle>
              <CardDescription>Set up your premium poster</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Poster Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Special Promotion"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="displayOnLaunch">Display on App Launch</Label>
                  <p className="text-sm text-muted-foreground">
                    Show this poster when users open the app
                  </p>
                </div>
                <Switch
                  id="displayOnLaunch"
                  checked={formData.displayOnLaunch}
                  onCheckedChange={(checked) => handleInputChange("displayOnLaunch", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Image Upload */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Poster Image</CardTitle>
              <CardDescription>Upload your promotional image (Recommended: 400x600px)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.imagePreview ? (
                <div className="relative">
                  <img
                    src={formData.imagePreview}
                    alt="Poster preview"
                    className="w-full h-80 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setFormData(prev => ({ ...prev, imagePreview: "", image: null }))}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Drop a poster image here, or click to select
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              )}

              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {formData.imagePreview ? "Change Image" : "Upload Image"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/premium-posters")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="gradient-primary shadow-primary hover:opacity-90"
          >
            {isLoading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? "Update Poster" : "Create Poster"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PremiumPosterForm;
