import { Tabs } from "antd";
import React from "react";

export default function Home() {
  return (
    <Tabs defaultActiveKey="home">
      <Tabs.TabPane tab={<span className="mx-8">Home</span>} key="home">
        Content of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<span className="mx-8">Documents</span>}
        key="documents"
      >
        Content of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<span className="mx-8">Appointments</span>}
        key="appointments"
      >
        Content of Tab Pane 3
      </Tabs.TabPane>
      <Tabs.TabPane tab={<span className="mx-8">Settings</span>} key="settings">
        Content of Tab Pane 3
      </Tabs.TabPane>
    </Tabs>
  );
}
