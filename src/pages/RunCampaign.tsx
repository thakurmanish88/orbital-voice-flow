import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Upload, Play } from "lucide-react";

const steps = [
  "Select Agent",
  "Upload Contacts", 
  "Campaign Settings",
  "Review & Launch"
];

const mockAgents = [
  { id: '1', name: 'Sarah - Appointment Assistant', type: 'Appointment Scheduling', status: 'Ready' },
  { id: '2', name: 'Alex - Lead Qualifier', type: 'Lead Generation', status: 'Ready' },
  { id: '3', name: 'Emma - Support Agent', type: 'Customer Support', status: 'Ready' },
];

export default function RunCampaign() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState('');

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="shadow-soft border-card-border">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold">Run Campaign</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              {steps.map((step, index) => (
                <span 
                  key={step}
                  className={`${index <= currentStep ? 'text-primary font-medium' : ''}`}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card className="shadow-soft border-card-border min-h-[400px]">
        <CardContent className="p-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Select an Existing Voice Agent</h3>
              <div className="space-y-3">
                {mockAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-soft ${
                      selectedAgent === agent.id 
                        ? 'border-primary bg-primary-light' 
                        : 'border-card-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                      </div>
                      <Badge variant="default" className="bg-success text-success-foreground">
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Upload Contact List</h3>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full h-32 border-dashed hover:bg-primary-light hover:border-primary"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">Upload CSV File</p>
                    <p className="text-sm text-muted-foreground">
                      Drag & drop your contact list or click to browse
                    </p>
                  </div>
                </Button>
                
                <div className="text-center">
                  <span className="text-muted-foreground">OR</span>
                </div>
                
                <Button variant="outline" className="w-full">
                  Enter Contacts Manually
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Campaign Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Call Window</label>
                    <select className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent">
                      <option>9 AM - 5 PM (Business Hours)</option>
                      <option>10 AM - 8 PM (Extended Hours)</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Retry Attempts</label>
                    <select className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent">
                      <option>1 attempt</option>
                      <option>2 attempts</option>
                      <option>3 attempts</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Call Frequency</label>
                    <select className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent">
                      <option>Immediate</option>
                      <option>1 hour apart</option>
                      <option>4 hours apart</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Q1 Lead Generation"
                      className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Review & Launch</h3>
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-medium mb-4">Campaign Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Agent:</span>
                      <p className="font-medium">Sarah - Appointment Assistant</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Contacts:</span>
                      <p className="font-medium">127 contacts</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Call Window:</span>
                      <p className="font-medium">9 AM - 5 PM</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Retry Attempts:</span>
                      <p className="font-medium">3 attempts</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full h-12 text-lg flex items-center justify-center gap-3">
                  <Play className="h-5 w-5" />
                  Launch Campaign
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}