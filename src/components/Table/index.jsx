import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

export default class CommonTable extends React.Component {
  static propTypes = {

  }

  static defaultProps = {
    rowKey: 'id'
  }

  state = {
    current: 1,
    pageSize: 10,
    total: 0
  }

  static getDerivedStateFromProps(nextProps) {

  }
  
  handleChange(pagination) {
    const { fetchData } = this.props;
    const { page, pageSize } = pagination;

    // fetch data
    if (fetchData) {
      const plusParams = {};
      fetchData({
        page,
        pageSize,
        ...plusParams
      });
    }
  }

  getPagination() {
    const { current, pageSize, total } = this.state;
    const { pagination } = this.props;
    return {
      current,
      pageSize,
      total,
      showTotal(total) {
        return `一共 ${total} 条数据`;
      },
      ...pagination
    }
  }

  redner() {
    return (
      <Table
        rowKey={this.props.rowKey}
        options={this.props.options}
        columns={this.props.columns}
        dataSource={this.props.dataSource}
        pagination={this.getPagination()}
        onChange={this.handleChange}
      />
    )
  }
}