import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '栏目1',
    key: '/page1',
    icon: <PieChartOutlined />
  },
  {
    label: '栏目2',
    key: '/page2',
    icon: <DesktopOutlined />
  },
  {
    label: '栏目3',
    key: 'page3',
    icon: <UserOutlined />,
    children: [
      {
        label: '子菜单3-1',
        key: '/page3/page3-1'
      },
      {
        label: '子菜单3-2',
        key: '/page3/page3-2'
      }
    ]
  },
  {
    label: '栏目4',
    key: 'page4',
    icon: <TeamOutlined />,
    children: [
      {
        label: '子菜单4-1',
        key: '/page4/page4-1'
      },
      {
        label: '子菜单4-2',
        key: '/page4/page4-2'
      }
    ]
  },
  {
    label: '栏目5',
    key: '/page5',
    icon: <FileOutlined />
  },
]

const Comp: React.FC = () => {
  const navigateTo = useNavigate()
  const currentRoute = useLocation()
  // 对比多个children
  const findCurrentRouteKey = (): string => {
    let currentKeyIndex = 0
    items.forEach((item: any, index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if(item.children) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const targetItem = item.children.find((child: any)=> child.key === currentRoute.pathname)
        if(targetItem) {
          currentKeyIndex = index
        }
      } 
    })
    return items[currentKeyIndex]?.['key'] as string
  }
  const firstOpenkey = findCurrentRouteKey()
  const [openKeys, setOpenKeys] = useState([firstOpenkey]);
  const menuClick = (e: {key: string}) => {
    // 点击跳转到对应的路由
    navigateTo(e.key)
  }
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys([keys[keys.length-1]])
  }
  return (
    <Menu 
      theme="dark" 
      // 表示当前选中项样式 defaultSelectedKeys
      defaultSelectedKeys={[currentRoute.pathname]} 
      mode="inline" 
      // 当前菜单展开项的key数组
      openKeys={openKeys}
      items={items} 
      onClick={menuClick}
      onOpenChange={handleOpenChange}
    />
  )
}
export default Comp