'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Eye, EyeOff, Save, Trash2, Plus } from 'lucide-react';

export default function TabSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [tabVisibility, setTabVisibility] = useState({
    dashboard: true,
    jobs: true,
    candidates: true,
    analytics: true,
    settings: true,
  });

  const toggleTabVisibility = (tab: string) => {
    setTabVisibility({
      ...tabVisibility,
      [tab]: !tabVisibility[tab as keyof typeof tabVisibility],
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Tab Settings</h1>

      <Tabs
        defaultValue="general"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent
          value="general"
          className="space-y-4 p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <Card>
            <CardHeader>
              <CardTitle>Tab Visibility</CardTitle>
              <CardDescription>
                Control which tabs are visible in the admin interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="grid gap-4">
                {Object.entries(tabVisibility).map(([tab, isVisible]) => (
                  <div
                    key={tab}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      {isVisible ? (
                        <Eye className="h-4 w-4 text-gray-500" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="capitalize">{tab}</span>
                    </div>
                    <Switch
                      checked={isVisible}
                      onCheckedChange={() => toggleTabVisibility(tab)}
                      aria-label={`${tab} visibility toggle`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tab Order</CardTitle>
              <CardDescription>Drag and drop to reorder tabs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.keys(tabVisibility).map((tab, index) => (
                  <div
                    key={tab}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md cursor-move hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 w-6 text-center">
                        {index + 1}
                      </span>
                      <span className="capitalize">{tab}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!tabVisibility[tab as keyof typeof tabVisibility] && (
                        <span className="text-xs text-gray-400 italic">
                          (Hidden)
                        </span>
                      )}
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Tab
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="appearance"
          className="space-y-4 p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <Card>
            <CardHeader>
              <CardTitle>Tab Style</CardTitle>
              <CardDescription>
                Customize the appearance of tabs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-2">
                <Label htmlFor="tab-style">Tab Style</Label>
                <Select defaultValue="pills">
                  <SelectTrigger id="tab-style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pills">Pills</SelectItem>
                    <SelectItem value="underlined">Underlined</SelectItem>
                    <SelectItem value="boxed">Boxed</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tab-size">Tab Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="tab-size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tab Spacing</Label>
                <Slider defaultValue={[2]} max={5} step={1} className="py-4" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Compact</span>
                  <span>Spacious</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tab-color">Accent Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    'bg-blue-500',
                    'bg-green-500',
                    'bg-purple-500',
                    'bg-amber-500',
                    'bg-rose-500',
                    'bg-slate-500',
                  ].map(color => (
                    <div
                      key={color}
                      className={`${color} h-8 w-full rounded-md cursor-pointer ring-offset-2 hover:ring-2 hover:ring-gray-400`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Apply Style</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="permissions"
          className="space-y-4 p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Tab Access</CardTitle>
              <CardDescription>
                Control which user roles can access specific tabs
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Tab</th>
                      <th className="text-center py-3 px-2">Admin</th>
                      <th className="text-center py-3 px-2">Manager</th>
                      <th className="text-center py-3 px-2">Editor</th>
                      <th className="text-center py-3 px-2">Viewer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(tabVisibility).map(tab => (
                      <tr key={tab} className="border-b">
                        <td className="py-3 px-2 capitalize">{tab}</td>
                        <td className="text-center py-3 px-2">
                          <Switch
                            defaultChecked
                            disabled
                            aria-label={`Admin access to ${tab}`}
                          />
                        </td>
                        <td className="text-center py-3 px-2">
                          <Switch
                            defaultChecked={tab !== 'settings'}
                            aria-label={`Manager access to ${tab}`}
                          />
                        </td>
                        <td className="text-center py-3 px-2">
                          <Switch
                            defaultChecked={
                              !['settings', 'analytics'].includes(tab)
                            }
                            aria-label={`Editor access to ${tab}`}
                          />
                        </td>
                        <td className="text-center py-3 px-2">
                          <Switch
                            defaultChecked={['dashboard', 'jobs'].includes(tab)}
                            aria-label={`Viewer access to ${tab}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Permissions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="advanced"
          className="space-y-4 p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <Card>
            <CardHeader>
              <CardTitle>Custom Tab Configuration</CardTitle>
              <CardDescription>
                Advanced settings for tab behavior and functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 md:p-8 lg:p-10s">
              <div className="space-y-2">
                <Label htmlFor="tab-transition">Tab Transition</Label>
                <Select defaultValue="fade">
                  <SelectTrigger id="tab-transition">
                    <SelectValue placeholder="Select transition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="slide">Slide</SelectItem>
                    <SelectItem value="zoom">Zoom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tab-persistence">Tab State Persistence</Label>
                <Select defaultValue="session">
                  <SelectTrigger id="tab-persistence">
                    <SelectValue placeholder="Select persistence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="session">Session</SelectItem>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="url">URL Parameter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label htmlFor="lazy-loading">Lazy Loading</Label>
                  <p className="text-sm text-gray-500">
                    Only load tab content when activated
                  </p>
                </div>
                <Switch id="lazy-loading" defaultChecked />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label htmlFor="remember-last">Remember Last Tab</Label>
                  <p className="text-sm text-gray-500">
                    Return to the last active tab on page reload
                  </p>
                </div>
                <Switch id="remember-last" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-css">Custom CSS</Label>
                <Input
                  id="custom-css"
                  placeholder=".tab { border-radius: 8px; }"
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
