import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  Share, 
  Filter, 
  FileText, 
  ArrowLeft,
  Calendar,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
  {
    id: "1",
    name: "Supply Agreement Q1-2024",
    ticket: "LOG-2024-001",
    createdAt: "2024-01-15",
    createdBy: "John Doe",
    status: "completed",
    fileSize: "2.4 MB",
    type: "Supply Agreement"
  },
  {
    id: "2",
    name: "Freight Contract December",
    ticket: "LOG-2024-002", 
    createdAt: "2024-01-14",
    createdBy: "Jane Smith",
    status: "completed",
    fileSize: "1.8 MB",
    type: "Freight Contract"
  },
  {
    id: "3",
    name: "Warehouse Lease Agreement",
    ticket: "LOG-2024-003",
    createdAt: "2024-01-13",
    createdBy: "Mike Johnson",
    status: "completed", 
    fileSize: "3.1 MB",
    type: "Lease Agreement"
  },
  {
    id: "4",
    name: "Distribution Partnership Q4",
    ticket: "LOG-2024-004",
    createdAt: "2024-01-12",
    createdBy: "Sarah Wilson",
    status: "completed",
    fileSize: "2.9 MB", 
    type: "Partnership Agreement"
  },
  {
    id: "5",
    name: "Transportation Services Contract",
    ticket: "LOG-2024-005",
    createdAt: "2024-01-11",
    createdBy: "John Doe",
    status: "completed",
    fileSize: "2.2 MB",
    type: "Service Contract"
  }
];

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.ticket.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || template.type === selectedType;
    return matchesSearch && matchesType;
  });

  const contractTypes = [...new Set(templates.map(t => t.type))];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Template History</h1>
            <p className="text-muted-foreground">
              Browse and download your previously generated templates
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Search Templates</CardTitle>
            <CardDescription>
              Find templates by name, ticket number, or contract type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                >
                  All Types
                </Button>
                {contractTypes.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>
              Templates ({filteredTemplates.length})
            </CardTitle>
            <CardDescription>
              {searchQuery ? `Showing results for "${searchQuery}"` : "All your generated templates"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {template.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {template.ticket}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {template.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(template.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {template.createdBy}
                        </div>
                        <span>{template.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    <Badge 
                      variant="outline" 
                      className="text-success border-success/20 bg-success/5"
                    >
                      {template.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" className="shadow-elegant">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No templates found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery 
                      ? "Try adjusting your search terms or filters"
                      : "Start by uploading your first contract"
                    }
                  </p>
                  <Button asChild>
                    <Link to="/upload">Upload Contract</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}