import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const steps = [
  "Choose Use Case",
  "Agent Details", 
  "Voice Settings",
  "Knowledge Base",
  "Preview & Test"
];

export default function CreateAgent() {
  const [currentStep, setCurrentStep] = useState(0);

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
            <CardTitle className="text-2xl font-bold">Create Voice Agent</CardTitle>
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
              <h3 className="text-xl font-semibold mb-6">Choose Your Use Case</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Appointment Scheduling",
                    description: "Book meetings and manage calendars automatically",
                    icon: "📅",
                  },
                  {
                    title: "Lead Generation", 
                    description: "Qualify prospects and gather contact information",
                    icon: "🎯",
                  },
                  {
                    title: "Customer Support",
                    description: "Handle inquiries and resolve common issues",
                    icon: "🎧",
                  }
                ].map((useCase) => (
                  <Button
                    key={useCase.title}
                    variant="outline"
                    className="h-auto p-6 text-left hover:bg-primary-light hover:border-primary transition-all"
                  >
                    <div className="space-y-2">
                      <div className="text-2xl">{useCase.icon}</div>
                      <h4 className="font-medium">{useCase.title}</h4>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Agent Details</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Sarah - Appointment Assistant"
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Greeting Message</label>
                  <textarea 
                    placeholder="Hi! I'm Sarah, your appointment assistant. How can I help you today?"
                    rows={3}
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Voice Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">Tone of Voice</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Friendly", "Professional", "Neutral"].map((tone) => (
                      <Button
                        key={tone}
                        variant="outline"
                        className="hover:bg-primary-light hover:border-primary"
                      >
                        {tone}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Knowledge Base</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full h-20 border-dashed">
                  <div className="text-center">
                    <p className="font-medium">Upload FAQ Document</p>
                    <p className="text-sm text-muted-foreground">Drag & drop CSV or PDF files here</p>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Preview & Test</h3>
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">Agent Created Successfully!</h4>
                <p className="text-muted-foreground mb-6">
                  Your voice agent "Sarah - Appointment Assistant" is ready to use.
                </p>
                <Button variant="outline" className="mr-3">
                  Test Agent
                </Button>
                <Button>
                  Use in Campaign
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