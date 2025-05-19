"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Moon, Sun } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="container mx-auto py-4 px-4 sm:px-6 sm:py-6">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="JobFind Admin" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@jobfind.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">System Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">(UTC-08:00) Pacific Time</SelectItem>
                    <SelectItem value="utc-5">(UTC-05:00) Eastern Time</SelectItem>
                    <SelectItem value="utc+0">(UTC+00:00) London</SelectItem>
                    <SelectItem value="utc+1">(UTC+01:00) Paris</SelectItem>
                    <SelectItem value="utc+8">(UTC+08:00) Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Take the site offline for maintenance</p>
                </div>
                <Switch id="maintenance-mode" className="mt-2 sm:mt-0" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="user-registration">User Registration</Label>
                  <p className="text-sm text-gray-500">Allow new user registrations</p>
                </div>
                <Switch id="user-registration" className="mt-2 sm:mt-0" defaultChecked />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="job-submissions">Job Submissions</Label>
                  <p className="text-sm text-gray-500">Allow employers to post new jobs</p>
                </div>
                <Switch id="job-submissions" className="mt-2 sm:mt-0" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save General Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                </div>
                <Switch id="two-factor" className="mt-2 sm:mt-0" defaultChecked />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="password-expiry">Password Expiry</Label>
                  <p className="text-sm text-gray-500">Force password reset every 90 days</p>
                </div>
                <Switch id="password-expiry" className="mt-2 sm:mt-0" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="login-attempts">Limit Login Attempts</Label>
                  <p className="text-sm text-gray-500">Lock account after 5 failed attempts</p>
                </div>
                <Switch id="login-attempts" className="mt-2 sm:mt-0" defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, letters & numbers)</SelectItem>
                    <SelectItem value="strong">Strong (8+ chars, upper/lower, numbers, symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the admin interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-4">Theme</h3>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Sun className="h-8 w-8 text-amber-500" />
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Moon className="h-8 w-8 text-indigo-500" />
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors bg-gray-100">
                    <div className="flex">
                      <Sun className="h-8 w-8 text-amber-500" />
                      <Moon className="h-8 w-8 text-indigo-500 -ml-4" />
                    </div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500", "bg-rose-500", "bg-slate-500"].map(
                    (color, index) => (
                      <div
                        key={color}
                        className={`${color} h-10 w-full rounded-md cursor-pointer ring-offset-2 ${index === 0 ? "ring-2 ring-blue-400" : ""}`}
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-sidebar">Compact Sidebar</Label>
                  <p className="text-sm text-gray-500">Use icons-only sidebar by default</p>
                </div>
                <Switch id="compact-sidebar" className="mt-2 sm:mt-0" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="show-welcome">Show Welcome Message</Label>
                  <p className="text-sm text-gray-500">Display welcome message on dashboard</p>
                </div>
                <Switch id="show-welcome" className="mt-2 sm:mt-0" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Appearance Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
