import './recommend.less'
import * as React from 'react';
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Banner from '../Banner';
const Recommend = () => {
  const [value, setValue] =  React.useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }
  return (
    <div className="afk-recommend">
      <div className="afk-recommend-left">
        <Banner/>
      </div>
      <div className="afk-recommend-right">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Latest Posts" value="1" />
                <Tab label="Popular Posts" value="2" />
                <Tab label="Featured Posts" value="3" />
                <Tab label="Newest Replies" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className='tab-panel-item'>
                Why does Nintendo keep patching dupe methods?<span>Tears of the Kingdom</span>
              </div>
              <div className='tab-panel-item'>
                Why does Nintendo keep patching dupe methods?<span>Tears of the Kingdom</span>
              </div>
              <div className='tab-panel-item'>
                Why does Nintendo keep patching dupe methods?<span>Tears of the Kingdom</span>
              </div>
              <div className='tab-panel-item'>
                Why does Nintendo keep patching dupe methods?<span>Tears of the Kingdom</span>
              </div>
              <div className='tab-panel-item'>
                Why does Nintendo keep patching dupe methods?<span>Tears of the Kingdom</span>
              </div>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">Newest Replies</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  )
}
export default Recommend