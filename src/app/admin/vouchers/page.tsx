'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Ticket,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  CalendarIcon,
  Percent,
  DollarSign,
  Tag,
  Users,
} from 'lucide-react';

const vouchers = [
  {
    id: 'V001',
    code: 'WELCOME20',
    type: 'Percentage',
    value: 20,
    status: 'Active',
    usageLimit: 100,
    usageCount: 45,
    startDate: '2023-05-01',
    endDate: '2023-06-30',
    minPurchase: 50,
    applicableTo: 'All Services',
  },
  {
    id: 'V002',
    code: 'SUMMER15',
    type: 'Percentage',
    value: 15,
    status: 'Active',
    usageLimit: 200,
    usageCount: 78,
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    minPurchase: 30,
    applicableTo: 'Job Postings',
  },
  {
    id: 'V003',
    code: 'FLAT10',
    type: 'Fixed Amount',
    value: 10,
    status: 'Inactive',
    usageLimit: 50,
    usageCount: 50,
    startDate: '2023-04-01',
    endDate: '2023-04-30',
    minPurchase: 25,
    applicableTo: 'Premium Services',
  },
  {
    id: 'V004',
    code: 'NEWYEAR25',
    type: 'Percentage',
    value: 25,
    status: 'Scheduled',
    usageLimit: 300,
    usageCount: 0,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    minPurchase: 40,
    applicableTo: 'All Services',
  },
  {
    id: 'V005',
    code: 'PREMIUM5',
    type: 'Fixed Amount',
    value: 5,
    status: 'Active',
    usageLimit: 1000,
    usageCount: 213,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    minPurchase: 15,
    applicableTo: 'CV Database Access',
  },
];

const coupons = [
  {
    id: 'C001',
    code: 'FIRSTJOB',
    type: 'Percentage',
    value: 30,
    status: 'Active',
    usageLimit: 1,
    usageCount: 89,
    startDate: '2023-05-01',
    endDate: '2023-12-31',
    minPurchase: 0,
    applicableTo: 'First Job Posting',
    userType: 'New Employers',
  },
  {
    id: 'C002',
    code: 'REFER10',
    type: 'Percentage',
    value: 10,
    status: 'Active',
    usageLimit: 1,
    usageCount: 156,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    minPurchase: 0,
    applicableTo: 'All Services',
    userType: 'Referred Users',
  },
  {
    id: 'C003',
    code: 'COMEBACK15',
    type: 'Percentage',
    value: 15,
    status: 'Active',
    usageLimit: 1,
    usageCount: 42,
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    minPurchase: 0,
    applicableTo: 'All Services',
    userType: 'Returning Users',
  },
];

export default function VouchersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newVoucherType, setNewVoucherType] = useState('voucher');

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    code: '',
    type: '',
    value: 0,
    status: '',
    usageLimit: 0,
    startDate: '',
    endDate: '',
    minPurchase: 0,
    applicableTo: '',
    userType: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const filteredVouchers = vouchers.filter(voucher => {
    const matchesSearch =
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      voucher.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      coupon.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Inactive
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Scheduled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const paginateData = (data: any[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const currentVouchers = paginateData(
    filteredVouchers,
    currentPage,
    itemsPerPage
  );
  const currentCoupons = paginateData(
    filteredCoupons,
    currentPage,
    itemsPerPage
  );

  const totalVoucherPages = Math.ceil(filteredVouchers.length / itemsPerPage);
  const totalCouponPages = Math.ceil(filteredCoupons.length / itemsPerPage);

  const goToNextPage = (isVouchers: boolean) => {
    const totalPages = isVouchers ? totalVoucherPages : totalCouponPages;
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getDisplayRange = (currentItems: any[], allItems: any[]) => {
    if (allItems.length === 0) return '0 of 0';
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(start + currentItems.length - 1, allItems.length);
    return `${start}-${end} of ${allItems.length}`;
  };

  const handleEditClick = (item: any) => {
    setCurrentVoucher(item);
    setEditFormData({
      code: item.code,
      type: item.type,
      value: item.value,
      status: item.status,
      usageLimit: item.usageLimit,
      startDate: item.startDate,
      endDate: item.endDate,
      minPurchase: item.minPurchase,
      applicableTo: item.applicableTo,
      userType: item.userType || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleCopyClick = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const handleDeleteClick = (item: any) => {
    setCurrentVoucher(item);
    setIsDeleteDialogOpen(true);
  };

  const saveEditedVoucher = () => {
    setIsEditDialogOpen(false);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Vouchers & Coupons
          </h1>
          <p className="text-muted-foreground">
            Manage promotional vouchers and coupons for your services
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by code or ID..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={value => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="vouchers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
        </TabsList>

        <TabsContent value="vouchers" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Vouchers</CardTitle>
              <CardDescription>
                Promotional codes that can be used multiple times by different
                users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Valid Period</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentVouchers.length > 0 ? (
                      currentVouchers.map(voucher => (
                        <TableRow key={voucher.id}>
                          <TableCell className="font-medium">
                            {voucher.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Ticket className="h-4 w-4 text-muted-foreground" />
                              <span>{voucher.code}</span>
                            </div>
                          </TableCell>
                          <TableCell>{voucher.type}</TableCell>
                          <TableCell>
                            {voucher.type === 'Percentage'
                              ? `${voucher.value}%`
                              : `$${voucher.value}`}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(voucher.status)}
                          </TableCell>
                          <TableCell>{`${voucher.usageCount}/${voucher.usageLimit}`}</TableCell>
                          <TableCell>{`${voucher.startDate} to ${voucher.endDate}`}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(voucher)}
                                title="Edit voucher"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopyClick(voucher.code)}
                                title="Copy code to clipboard"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteClick(voucher)}
                                title="Delete voucher"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No vouchers found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {getDisplayRange(currentVouchers, filteredVouchers)}{' '}
                vouchers
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm mx-2">
                  Page {currentPage} of {totalVoucherPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToNextPage(true)}
                  disabled={
                    currentPage >= totalVoucherPages || totalVoucherPages === 0
                  }
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="coupons" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Coupons</CardTitle>
              <CardDescription>
                One-time use promotional codes typically for new or specific
                user groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCoupons.length > 0 ? (
                      currentCoupons.map(coupon => (
                        <TableRow key={coupon.id}>
                          <TableCell className="font-medium">
                            {coupon.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-muted-foreground" />
                              <span>{coupon.code}</span>
                            </div>
                          </TableCell>
                          <TableCell>{coupon.type}</TableCell>
                          <TableCell>
                            {coupon.type === 'Percentage'
                              ? `${coupon.value}%`
                              : `$${coupon.value}`}
                          </TableCell>
                          <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                          <TableCell>{`${coupon.usageCount}/${coupon.usageLimit} per user`}</TableCell>
                          <TableCell>{coupon.userType}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(coupon)}
                                title="Edit coupon"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopyClick(coupon.code)}
                                title="Copy code to clipboard"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteClick(coupon)}
                                title="Delete coupon"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No coupons found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {getDisplayRange(currentCoupons, filteredCoupons)}{' '}
                coupons
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm mx-2">
                  Page {currentPage} of {totalCouponPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToNextPage(false)}
                  disabled={
                    currentPage >= totalCouponPages || totalCouponPages === 0
                  }
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Promotional Code</DialogTitle>
            <DialogDescription>
              Add a new voucher or coupon to offer discounts on your services.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code-type">Code Type</Label>
                <Select
                  value={newVoucherType}
                  onValueChange={setNewVoucherType}
                >
                  <SelectTrigger id="code-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voucher">Voucher (Multi-use)</SelectItem>
                    <SelectItem value="coupon">Coupon (One-time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input id="code" placeholder="e.g. SUMMER20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount-type">Discount Type</Label>
                <Select defaultValue="percentage">
                  <SelectTrigger id="discount-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="value"
                    type="number"
                    placeholder="20"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input id="start-date" type="date" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input id="end-date" type="date" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usage-limit">Usage Limit</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="usage-limit"
                    type="number"
                    placeholder="100"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-purchase">Minimum Purchase</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="min-purchase"
                    type="number"
                    placeholder="0"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicable-to">Applicable To</Label>
              <Select defaultValue="all">
                <SelectTrigger id="applicable-to">
                  <SelectValue placeholder="Select services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="job-postings">Job Postings</SelectItem>
                  <SelectItem value="premium">Premium Services</SelectItem>
                  <SelectItem value="cv-database">
                    CV Database Access
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newVoucherType === 'coupon' && (
              <div className="space-y-2">
                <Label htmlFor="user-type">User Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="user-type">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="new">New Users</SelectItem>
                    <SelectItem value="returning">Returning Users</SelectItem>
                    <SelectItem value="referred">Referred Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox id="active" />
              <Label htmlFor="active">Set as active immediately</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Voucher/Coupon Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Edit {currentVoucher?.id.startsWith('V') ? 'Voucher' : 'Coupon'}
            </DialogTitle>
            <DialogDescription>
              Make changes to the{' '}
              {currentVoucher?.id.startsWith('V') ? 'voucher' : 'coupon'}{' '}
              details.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-code">Code</Label>
                <Input
                  id="edit-code"
                  value={editFormData.code}
                  onChange={e =>
                    setEditFormData({ ...editFormData, code: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-discount-type">Discount Type</Label>
                <Select
                  value={
                    editFormData.type === 'Percentage' ? 'percentage' : 'fixed'
                  }
                  onValueChange={value =>
                    setEditFormData({
                      ...editFormData,
                      type:
                        value === 'percentage' ? 'Percentage' : 'Fixed Amount',
                    })
                  }
                >
                  <SelectTrigger id="edit-discount-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-value">Value</Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={editFormData.value}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      value: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editFormData.status.toLowerCase()}
                  onValueChange={value =>
                    setEditFormData({
                      ...editFormData,
                      status: value.charAt(0).toUpperCase() + value.slice(1),
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-usage-limit">Usage Limit</Label>
                <Input
                  id="edit-usage-limit"
                  type="number"
                  value={editFormData.usageLimit}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      usageLimit: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-min-purchase">Minimum Purchase</Label>
                <Input
                  id="edit-min-purchase"
                  type="number"
                  value={editFormData.minPurchase}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      minPurchase: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-start-date">Start Date</Label>
                <Input
                  id="edit-start-date"
                  type="date"
                  value={editFormData.startDate}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-end-date">End Date</Label>
                <Input
                  id="edit-end-date"
                  type="date"
                  value={editFormData.endDate}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-applicable-to">Applicable To</Label>
              <Select
                value={
                  editFormData.applicableTo === 'All Services'
                    ? 'all'
                    : editFormData.applicableTo === 'Job Postings'
                    ? 'job-postings'
                    : editFormData.applicableTo === 'Premium Services'
                    ? 'premium'
                    : 'cv-database'
                }
                onValueChange={value => {
                  const mapping: { [key: string]: string } = {
                    all: 'All Services',
                    'job-postings': 'Job Postings',
                    premium: 'Premium Services',
                    'cv-database': 'CV Database Access',
                  };
                  setEditFormData({
                    ...editFormData,
                    applicableTo: mapping[value],
                  });
                }}
              >
                <SelectTrigger id="edit-applicable-to">
                  <SelectValue placeholder="Select services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="job-postings">Job Postings</SelectItem>
                  <SelectItem value="premium">Premium Services</SelectItem>
                  <SelectItem value="cv-database">
                    CV Database Access
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {currentVoucher?.id.startsWith('C') && (
              <div className="space-y-2">
                <Label htmlFor="edit-user-type">User Type</Label>
                <Select
                  value={
                    editFormData.userType === 'All Users'
                      ? 'all'
                      : editFormData.userType === 'New Users'
                      ? 'new'
                      : editFormData.userType === 'Returning Users'
                      ? 'returning'
                      : 'referred'
                  }
                  onValueChange={value => {
                    const mapping: { [key: string]: string } = {
                      all: 'All Users',
                      new: 'New Users',
                      returning: 'Returning Users',
                      referred: 'Referred Users',
                    };
                    setEditFormData({
                      ...editFormData,
                      userType: mapping[value],
                    });
                  }}
                >
                  <SelectTrigger id="edit-user-type">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="new">New Users</SelectItem>
                    <SelectItem value="returning">Returning Users</SelectItem>
                    <SelectItem value="referred">Referred Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveEditedVoucher}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentVoucher?.code}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
