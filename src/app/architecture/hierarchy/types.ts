export interface HierarchyElement {
  id: number;
  type:
    | 'Interface.In.Ext'
    | 'Interface.Out.Ext'
    | 'Interface.In.HWE'
    | 'Interface.Out.HWE'
    | 'Interface.In.Int'
    | 'Interface.Out.Int'
    | 'Calibration'
    | '-';
  name: string;
  description: string;
  value: string;
}

export interface HierarchyItem {
  id: number;
  data: string;
}
