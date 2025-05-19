'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Mail,
  Shield,
  Edit,
  Save,
  X,
  Upload,
  Clock,
  Activity,
  Lock,
  Key,
} from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/abstract-profile.png');

  const [profile, setProfile] = useState({
    name: 'Admin User',
    role: 'System Administrator',
    email: 'admin@jobfind.com',
    permissions: 'Full Access',
    bio: 'System administrator responsible for platform management and maintenance.',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);

    alert('Profile updated successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto py-4 px-4 sm:px-6 sm:py-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Profile</h1>
        {!isEditing ? (
          <Button
            onClick={handleEditToggle}
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={handleSaveProfile}
              variant="default"
              className="flex items-center gap-2 flex-1 sm:flex-auto"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Button
              onClick={handleEditToggle}
              variant="outline"
              className="flex items-center gap-2 flex-1 sm:flex-auto"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-md">
                  <AvatarImage
                    src={profileImage || '/placeholder.svg'}
                    alt={profile.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {profile.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <label
                      htmlFor="profile-image"
                      className="cursor-pointer p-2 bg-white rounded-full"
                    >
                      <Upload className="h-5 w-5" />
                      <input
                        id="profile-image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                )}
              </div>

              {isEditing ? (
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="text-xl font-bold text-center mb-1"
                />
              ) : (
                <CardTitle className="text-xl mb-1">{profile.name}</CardTitle>
              )}

              <Badge variant="secondary" className="mb-2">
                {profile.role}
              </Badge>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Active 2 hours ago</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>{profile.permissions}</span>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Admin Notes</h3>
                {isEditing ? (
                  <Textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.bio}</p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              Change Password
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto">
              Log Out
            </Button>
          </CardFooter>
        </Card>

        {/* Tabs Section */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                  <CardDescription>
                    Your professional information and bio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Bio</h3>
                    {isEditing ? (
                      <Textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleInputChange}
                        className="min-h-[120px]"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profile.bio}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Responsibilities</h3>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Manage user accounts and access permissions</li>
                      <li>Monitor platform performance and user activity</li>
                      <li>Review and approve content submissions</li>
                      <li>Handle escalated support tickets</li>
                      <li>Generate and analyze platform reports</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Work Schedule</h3>
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                        (day, i) => (
                          <div
                            key={day}
                            className={`p-2 rounded-md ${
                              i < 5
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <div className="font-medium">{day}</div>
                            {i < 5 && <div className="text-xs">9am-5pm</div>}
                            {i >= 5 && <div className="text-xs">Off</div>}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent actions and system events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        action:
                          'Updated user permissions for Tech Solutions Inc.',
                        time: 'Today at 10:23 AM',
                        icon: <Shield className="h-5 w-5" />,
                      },
                      {
                        action: 'Approved 12 new job postings',
                        time: 'Yesterday at 4:45 PM',
                        icon: <Activity className="h-5 w-5" />,
                      },
                      {
                        action: 'Generated monthly activity report',
                        time: 'Yesterday at 2:30 PM',
                        icon: <Activity className="h-5 w-5" />,
                      },
                      {
                        action: 'Resolved support ticket #4582',
                        time: 'May 15, 2023 at 11:15 AM',
                        icon: <Activity className="h-5 w-5" />,
                      },
                      {
                        action: 'Updated system settings',
                        time: 'May 14, 2023 at 3:20 PM',
                        icon: <Activity className="h-5 w-5" />,
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="bg-muted p-2 rounded-full">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground">
                          Last changed 45 days ago
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        Change Password
                      </Button>
                    </div>
                    <Separator />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                    <Separator />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">API Keys</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage your API access
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Key className="h-4 w-4" />
                        Manage Keys
                      </Button>
                    </div>
                    <Separator />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Active Sessions</h3>
                    <div className="space-y-4">
                      {[
                        {
                          device: 'Windows PC - Chrome',
                          location: 'San Francisco, CA',
                          current: true,
                        },
                        {
                          device: 'iPhone 13 - Safari',
                          location: 'San Francisco, CA',
                          current: false,
                        },
                        {
                          device: 'MacBook Pro - Firefox',
                          location: 'New York, NY',
                          current: false,
                        },
                      ].map((session, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-muted/50 rounded-md"
                        >
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              {session.device}
                              {session.current && (
                                <Badge variant="secondary" className="text-xs">
                                  Current
                                </Badge>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {session.location}
                            </p>
                          </div>
                          {!session.current && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              Revoke
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        {
                          title: 'Email Notifications',
                          description: 'Receive updates via email',
                        },
                        {
                          title: 'Browser Notifications',
                          description: 'Get alerts in your browser',
                        },
                        {
                          title: 'SMS Notifications',
                          description: 'Get text messages for critical alerts',
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <Label
                              htmlFor={`notify-${i}`}
                              className="font-medium"
                            >
                              {item.title}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Switch id={`notify-${i}`} defaultChecked={i < 2} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Appearance</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        {['Light', 'Dark', 'System'].map((theme, i) => (
                          <div
                            key={theme}
                            className={`border rounded-md p-3 text-center cursor-pointer ${
                              i === 0 ? 'border-blue-500 bg-blue-50' : ''
                            }`}
                          >
                            {theme}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Language & Region</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="language" className="block mb-2">
                          Language
                        </Label>
                        <select
                          id="language"
                          className="w-full p-2 border rounded-md"
                        >
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Japanese</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="timezone" className="block mb-2">
                          Timezone
                        </Label>
                        <select
                          id="timezone"
                          className="w-full p-2 border rounded-md"
                        >
                          <option>Pacific Time (PT)</option>
                          <option>Eastern Time (ET)</option>
                          <option>Central European Time (CET)</option>
                          <option>Japan Standard Time (JST)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
