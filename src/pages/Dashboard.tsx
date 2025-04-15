
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthState, logout, User } from "@/lib/auth";
import { LogOut, BarChart2, TrendingUp, Truck, Package, Users } from "lucide-react";
import { fadeIn, slideIn, staggerAnimation } from "@/lib/animate";

interface LogisticsData {
  id: number;
  name: string;
  range1: number;
  range2: number;
}

const mockData: LogisticsData[] = [
  { id: 1, name: "Shipments", range1: 104, range2: 241 },
  { id: 2, name: "Deliveries", range1: 82, range2: 175 },
  { id: 3, name: "Returns", range1: 23, range2: 45 },
  { id: 4, name: "Delays", range1: 12, range2: 31 },
  { id: 5, name: "New Customers", range1: 45, range2: 78 }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [logisticsData, setLogisticsData] = useState<LogisticsData[]>(mockData);
  
  // Refs for animations
  const headerRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const actionCardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const { user, isAuthenticated } = getAuthState();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    setUser(user);
    
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLogisticsData(mockData);
    }, 500);
    
    // Apply animations
    if (headerRef.current) {
      fadeIn(headerRef.current, 100);
    }
    
    if (cardsContainerRef.current) {
      const cards = Array.from(
        cardsContainerRef.current.querySelectorAll(".card-item")
      ) as HTMLElement[];
      
      staggerAnimation(cards, (el, delay) => {
        slideIn(el, "up", "20px", delay);
      }, 100);
    }
    
    if (tableRef.current) {
      slideIn(tableRef.current, "up", "20px", 400);
    }
    
    if (actionCardRef.current) {
      slideIn(actionCardRef.current, "up", "20px", 600);
    }
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow" ref={headerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Logistics Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.name || "User"}</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" ref={cardsContainerRef}>
          <Card className="card-item">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-logistics-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-logistics-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Shipments</p>
                  <h3 className="text-2xl font-bold text-gray-900">1,245</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-item">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Deliveries</p>
                  <h3 className="text-2xl font-bold text-gray-900">857</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-item">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Growth</p>
                  <h3 className="text-2xl font-bold text-gray-900">+28%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-item">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">New Clients</p>
                  <h3 className="text-2xl font-bold text-gray-900">123</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Statistics Table */}
        <div ref={tableRef}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Logistics Statistics</CardTitle>
              <CardDescription>
                Overview of your logistics data for the current period
              </CardDescription>
            </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Range 1</th>
                    <th scope="col" className="px-6 py-3">Range 2</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {logisticsData.map((item) => (
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4">{item.range1}</td>
                      <td className="px-6 py-4">{item.range2}</td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900">
                    <th scope="row" className="px-6 py-3 text-base">Totals</th>
                    <td className="px-6 py-3">266</td>
                    <td className="px-6 py-3">570</td>
                    <td className="px-6 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
        </div>
        
        {/* Start In Section */}
        <div ref={actionCardRef}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Get Started with Analytics</CardTitle>
            <CardDescription>
              Gain deeper insights into your logistics operations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 max-w-md">
                Our advanced analytics tools help you understand your logistics data better and make informed decisions.
              </p>
            </div>
            <Button className="bg-logistics-600 hover:bg-logistics-700">
              <BarChart2 className="mr-2 h-4 w-4" />
              Start in Analytics
            </Button>
          </CardContent>
        </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
