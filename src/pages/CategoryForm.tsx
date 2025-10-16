import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Save, ImageIcon } from "lucide-react";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    icon: null as File | null,
    iconPreview: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for icons
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an icon smaller than 2MB."
        });
        return;
      }

      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please select an image file (PNG, JPG, SVG)."
        });
        return;
      }

      setFormData(prev => ({
        ...prev,
        icon: file,
        iconPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter a category name."
      });
      setIsLoading(false);
      return;
    }

    if (!formData.icon && !isEdit) {
      toast({
        variant: "destructive",
        title: "Missing Icon",
        description: "Please upload an icon for the category."
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: isEdit ? "Category Updated" : "Category Created",
      description: isEdit 
        ? "Category has been updated successfully." 
        : "New category has been created successfully."
    });

    navigate("/categories");
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/categories")}
          className="hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Category" : "Create New Category"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? "Update the category details" : "Add a new job category with an icon"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Category Info */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
              <CardDescription>
                Enter the category name
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Central Government"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This name will appear in the mobile app
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Icon Upload */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Category Icon *</CardTitle>
              <CardDescription>
                Upload an icon that represents this category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Icon Preview */}
                {formData.iconPreview ? (
                  <div className="relative">
                    <div className="w-full aspect-square max-w-[200px] mx-auto">
                      <img
                        src={formData.iconPreview}
                        alt="Category icon"
                        className="w-full h-full object-contain rounded-lg border-2 border-border p-4 bg-muted/30"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        handleInputChange("iconPreview", "");
                        handleInputChange("icon", null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Drop an icon here, or click to select
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, SVG up to 2MB
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Recommended: Square image (200x200px)
                      </p>
                    </div>
                  </div>
                )}

                {/* File Input */}
                <div>
                  <input
                    type="file"
                    id="icon-upload"
                    accept="image/*"
                    onChange={handleIconUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("icon-upload")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {formData.iconPreview ? "Change Icon" : "Upload Icon"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Card */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Mobile App Preview</CardTitle>
            <CardDescription>
              How this category will appear in the mobile app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
              {formData.iconPreview ? (
                <img
                  src={formData.iconPreview}
                  alt="Preview"
                  className="w-16 h-16 object-contain rounded-lg border-2 border-border bg-background p-2"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-background">
                  <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg">
                  {formData.name || "Category Name"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tap to view jobs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/categories")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
