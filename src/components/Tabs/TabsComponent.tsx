import { Tab, Tabs } from '@mui/material';

interface ITabsComponentProps {
  tabs: Array<{
    label: React.ReactNode;
    value: number;
  }>;
  onChange: (_e: React.ChangeEvent<unknown>, newValue: number) => void;
  value: number;
}

export const TabsComponent: React.FC<ITabsComponentProps> = ({ tabs, onChange, value }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      textColor="primary"
      indicatorColor="primary"
      sx={{
        '*': { textTransform: "none !important", fontSize: '1.5rem !important' },
        '@media (max-width: 760px)': {
          '*': { fontSize: "0.875rem !important"},
        }
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          value={tab.value}
        />
      ))}
    </Tabs>
  )
}

