type TLast15Data = {
  name: string;
  studentIdNo: string;
  department: string;
  office: string;
  validity: Date;
  date: Date;
  inTime: string;
  outTime: string;
  type: string;
};

type TDashboard = {
  totalUser: number;
  totalActiveRfidCard: number;
  totalPunch: number;
  totalUniquePunch: number;
  last15Data: TLast15Data[];
};
