'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Eye, Copy } from 'lucide-react';

export function ApiServiceSettings() {
  const [apiConnected, setApiConnected] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [showAccessToken, setShowAccessToken] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const accessToken = '••••••••••••••••••••••••••••••';
  const secretKey = '••••••••••••••••••••••••••••••';

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleUpdateWebhook = () => {};

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-teal-700">Dịch vụ API</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Kết nối API</span>
          <Switch
            checked={apiConnected}
            onCheckedChange={setApiConnected}
            className="data-[state=checked]:bg-teal-500"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Để kết nối API với phần mềm quản trị tuyển dụng, CRM, tài khoản cần mua
        và được kích hoạt dịch vụ API trước khi dữ liệu được đồng bộ
      </p>

      <div className="space-y-6">
        {/* Access Token Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Access Token</label>
          <div className="relative">
            <Input
              type={showAccessToken ? 'text' : 'password'}
              value={accessToken}
              readOnly
              className="pr-20 font-mono"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                onClick={() => setShowAccessToken(!showAccessToken)}
                className="p-1.5 text-gray-500 hover:text-gray-700"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => copyToClipboard(accessToken)}
                className="p-1.5 text-gray-500 hover:text-gray-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Vui lòng tải lại trang sau khi thêm access token thành công ở lần
            thứ 3.
          </p>
        </div>

        {/* Webhook URL Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Webhook URL</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Nhập URL"
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleUpdateWebhook}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Cập nhật
            </Button>
          </div>
        </div>

        {/* Secret Key Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Secret key</label>
          <div className="relative">
            <Input
              type={showSecretKey ? 'text' : 'password'}
              value={secretKey}
              readOnly
              className="pr-20 font-mono"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="p-1.5 text-gray-500 hover:text-gray-700"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => copyToClipboard(secretKey)}
                className="p-1.5 text-gray-500 hover:text-gray-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
