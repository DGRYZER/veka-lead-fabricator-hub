
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, User, Settings } from 'lucide-react';

const Leads = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');
  const [searchTerm, setSearchTerm] = useState('');

  const leads = [
    {
      id: 'FT-000932',
      customerName: 'Rajesh Reddy',
      address: 'Plot 45, Banjara Hills, Hyderabad - 500034',
      date: '13 Oct 2024, 14:11',
      status: 'active',
      priority: 'high'
    },
    {
      id: 'FT-002263',
      customerName: 'Priya Sharma',
      address: '205, Jubilee Hills, Road No. 36, Hyderabad - 500033',
      date: '14 Oct 2024, 09:12',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 'FT-003317',
      customerName: 'Venkat Rao',
      address: '12-3-456, Begumpet, Hyderabad - 500016',
      date: '13 Oct 2024, 23:06',
      status: 'in-progress',
      priority: 'low'
    },
    {
      id: 'FT-003318',
      customerName: 'Sanjay Gupta',
      address: '78, Kukatpally Housing Board, Hyderabad - 500072',
      date: '15 Oct 2024, 10:30',
      status: 'completed',
      priority: 'high'
    },
    {
      id: 'FT-003319',
      customerName: 'Lakshmi Devi',
      address: '34-67-89, Madhapur, Cyberabad, Hyderabad - 500081',
      date: '15 Oct 2024, 15:45',
      status: 'active',
      priority: 'medium'
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesSearch = !searchTerm || 
      lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-green-500 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleFilterClick = (status: string | null) => {
    if (status) {
      setSearchParams({ status });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Leads ({filteredLeads.length})</h1>
            <p className="text-sm text-gray-500">Last Sync: 1 day, 11 hours, 12 minutes ago</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Search and Filters */}
        <div className="mb-4">
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 rounded-xl h-12"
          />
          
          <div className="flex gap-2 flex-wrap">
            <Badge 
              variant={!statusFilter ? "default" : "secondary"} 
              className="cursor-pointer px-4 py-2 rounded-full"
              onClick={() => handleFilterClick(null)}
            >
              All
            </Badge>
            <Badge 
              variant={statusFilter === 'active' ? "default" : "secondary"} 
              className="cursor-pointer px-4 py-2 rounded-full"
              onClick={() => handleFilterClick('active')}
            >
              Unconfirmed
            </Badge>
            <Badge 
              variant={statusFilter === 'in-progress' ? "default" : "secondary"} 
              className="cursor-pointer px-4 py-2 rounded-full"
              onClick={() => handleFilterClick('in-progress')}
            >
              In Progress
            </Badge>
            <Badge 
              variant={statusFilter === 'completed' ? "default" : "secondary"} 
              className="cursor-pointer px-4 py-2 rounded-full"
              onClick={() => handleFilterClick('completed')}
            >
              Completed
            </Badge>
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-3">
          {filteredLeads.map((lead) => (
            <Card 
              key={lead.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow rounded-2xl"
              onClick={() => navigate(`/lead/${lead.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(lead.priority)}`}></div>
                      <span className="font-medium text-gray-600">{lead.id}</span>
                      <span className="text-sm text-gray-500">{lead.date}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">{lead.customerName}</h3>
                    <p className="text-sm text-gray-600 mb-1">Delivery to:</p>
                    <p className="text-sm text-gray-800">{lead.address}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${getStatusColor(lead.status)} rounded-full px-3 py-1`}>
                      {lead.status === 'active' ? 'Unconfirmed' : 
                       lead.status === 'in-progress' ? 'In Progress' : 
                       'Completed'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No leads found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;
