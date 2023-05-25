import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;
const treeDataMock = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'my leaf',
          },
          {
            value: 'leaf2',
            title: 'your leaf',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'sss',
            title: <b style={{ color: '#08c' }}>sss</b>,
          },
        ],
      },
    ],
  },
];

interface MyTreeDataSelectItem {
  value: string;
  title: string | Element | JSX.Element;
  children?: MyTreeDataSelectItem[];
}

interface MyTreeSelectProps {
  onSelect?: (newValue: string, node?: React.ReactNode, changeEventExtra?: any) => void;
  treeData: MyTreeDataSelectItem[];
}

const MyTreeSelect: React.FC<MyTreeSelectProps> = ({ onSelect, treeData }) => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string, node: React.ReactNode, changeEventExtra: any) => {
    setValue(newValue);
    onSelect && onSelect(newValue, node, changeEventExtra);

    console.log('node', node);
    console.log('changeEventExtra', changeEventExtra);
  };

  const tProps = {
    treeData: treeData.length === 0 ? (treeDataMock as MyTreeDataSelectItem[]) : treeData,
    value,
    onChange: onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };

  return (
    <TreeSelect
      showSearch
      dropdownStyle={{ maxHeight: 300, overflow: 'auto', zIndex: 2000 }}
      allowClear
      multiple
      treeDefaultExpandAll
      {...tProps}
    />
  );
};

export default MyTreeSelect;
