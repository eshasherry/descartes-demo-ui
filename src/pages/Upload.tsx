import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadZone } from "@/components/ui/upload-zone";
import { Loader2, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    ticketNumber: "",
    contractDate: "",
    expiryDate: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to process",
        variant: "destructive"
      });
      return;
    }

    if (!formData.ticketNumber) {
      toast({
        title: "Missing ticket number",
        description: "Please enter a ticket number",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', selectedFile);

      const requestData = {
        plrm_ticket_number: formData.ticketNumber,
        contract_start_date: formData.contractDate,
        contract_end_date: formData.expiryDate,
        amendment_number: "",
        surcharge_codes: [],
        webhook_url: "http://localhost:5000/webhook"
      };

      formDataToSend.append('request', JSON.stringify(requestData));

      const response = await fetch('http://127.0.0.1:8000/generate-template', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          // Job started response
          const responseData = await response.json();
          toast({
            title: "Template Generation Started!",
            description: `Job ID: ${responseData.job_id}. Processing your request...`,
          });
        } else {
          // File download response
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `template_${formData.ticketNumber || 'export'}.xlsx`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          toast({
            title: "Template Downloaded!",
            description: "Your Excel template has been downloaded successfully.",
          });
        }
        
        // Reset form
        setSelectedFile(undefined);
        setFormData({
          ticketNumber: "",
          contractDate: "",
          expiryDate: "",
          notes: ""
        });
      } else {
        throw new Error('Failed to generate template');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to start template generation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Upload Contract</h1>
            <p className="text-muted-foreground">
              Upload your PDF contract and fill in the details to generate an Excel template
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Contract Document</CardTitle>
              <CardDescription>
                Upload the PDF contract you want to process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadZone 
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </CardContent>
          </Card>

          {/* Contract Details */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
              <CardDescription>
                Provide additional information about this contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ticketNumber">Ticket Number *</Label>
                  <Input
                    id="ticketNumber"
                    placeholder="LOG-2024-001"
                    value={formData.ticketNumber}
                    onChange={(e) => handleInputChange("ticketNumber", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contractDate">Contract Date</Label>
                  <Input
                    id="contractDate"
                    type="date"
                    value={formData.contractDate}
                    onChange={(e) => handleInputChange("contractDate", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information or special requirements..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="font-medium text-foreground mb-1">Ready to Generate</h3>
                  <p className="text-sm text-muted-foreground">
                    Click generate to create your Excel template
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isProcessing || !selectedFile}
                  className="shadow-elegant min-w-[140px]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Processing Status */}
        {isProcessing && (
          <Card className="shadow-card border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <div>
                  <h3 className="font-medium text-foreground">Processing your contract...</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI is analyzing the document and generating your Excel template
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}