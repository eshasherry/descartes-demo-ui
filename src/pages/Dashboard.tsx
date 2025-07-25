import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, History, FileText, TrendingUp, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Templates Generated",
    value: "147",
    change: "+12%",
    icon: FileText,
    trend: "up"
  },
  {
    title: "Processing Time",
    value: "2.3min",
    change: "-18%",
    icon: Clock,
    trend: "down"
  },
  {
    title: "Active Users",
    value: "24",
    change: "+3",
    icon: Users,
    trend: "up"
  }
];

const recentTemplates = [
  {
    id: "1",
    name: "Supply Agreement Q1-2024",
    ticket: "LOG-2024-001",
    createdAt: "2 hours ago",
    status: "completed"
  },
  {
    id: "2", 
    name: "Freight Contract December",
    ticket: "LOG-2024-002",
    createdAt: "4 hours ago",
    status: "completed"
  },
  {
    id: "3",
    name: "Warehouse Lease Agreement",
    ticket: "LOG-2024-003", 
    createdAt: "1 day ago",
    status: "completed"
  }
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Transform your contracts into structured Excel templates with AI
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/history">
                <History className="w-4 h-4 mr-2" />
                View History
              </Link>
            </Button>
            <Button asChild className="shadow-elegant">
              <Link to="/upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload Contract
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-card hover:shadow-elegant transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-success' : 'text-primary'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Start processing your contracts in seconds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                asChild 
                variant="outline" 
                className="h-auto p-6 justify-start hover:bg-primary/5 hover:border-primary/30"
              >
                <Link to="/upload">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Upload New Contract</h3>
                      <p className="text-sm text-muted-foreground">
                        Process a new PDF contract
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="h-auto p-6 justify-start hover:bg-primary/5 hover:border-primary/30"
              >
                <Link to="/history">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <History className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Browse Templates</h3>
                      <p className="text-sm text-muted-foreground">
                        Search previous results
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Templates */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Templates</CardTitle>
              <CardDescription>
                Your latest processed contracts
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/history">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {template.ticket} • {template.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
                      {template.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}