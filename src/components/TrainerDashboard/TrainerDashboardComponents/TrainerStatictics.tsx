import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

const TrainerStatistics = () => {
  return (
  <Row gutter={16}>
    <Col span={6}>
      <Card
        bordered={false}
        style={{
          background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)',
        }}
      >
        <Statistic
          title={<span style={{ color: '#FFFFFF99'}}>Total Clients</span>}
          value={24}
          valueStyle={{
            color: '#FFFFFF',
          }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card
        bordered={false}
        style={{
          background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)',
        }}
      >
        <Statistic
          title={<span style={{ color: '#FFFFFF99'}}>Revenue Generated</span>}
          value={100000}
          valueStyle={{
            color: '#FFFFFF',
          }}
          prefix="$"
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card
        bordered={false}
        style={{
          background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)',
        }}
      >
        <Statistic
          title={<span style={{ color: '#FFFFFF99'}}>Upcomming Sessions</span>}
          value={10}
          valueStyle={{
            color: '#FFFFFF',
          }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card
        bordered={false}
        style={{
          background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)',
        }}
      >
        <Statistic
          title={<span style={{ color: '#FFFFFF99'}}>Sessions Completed</span>}
          value={40}
          valueStyle={{
            color: '#FFFFFF',
          }}
        />
      </Card>
    </Col>
  </Row>
  )
}

export default TrainerStatistics;