import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and platform settings
        </p>
      </div>

      {/* Account Settings */}
      <Card className="shadow-soft border-card-border">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                defaultValue="John Smith"
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input 
                type="email" 
                defaultValue="john.smith@company.com"
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <input 
                type="text" 
                defaultValue="Acme Corp"
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input 
                type="tel" 
                defaultValue="+1 (555) 123-4567"
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
          <Separator />
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-soft border-card-border">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Campaign Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified when campaigns start, complete, or encounter issues
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Daily Summary</h4>
                <p className="text-sm text-muted-foreground">
                  Receive daily performance summaries via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">System Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified about new features and platform updates
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Settings */}
      <Card className="shadow-soft border-card-border">
        <CardHeader>
          <CardTitle>Default Voice Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Voice Tone</label>
              <select className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent">
                <option>Professional</option>
                <option>Friendly</option>
                <option>Neutral</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Speaking Speed</label>
              <select className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent">
                <option>Normal</option>
                <option>Slow</option>
                <option>Fast</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="shadow-soft border-card-border">
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button variant="outline">Change Password</Button>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}