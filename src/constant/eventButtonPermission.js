export const eventButtonPermission = [ // 性别
  { code: 'CRM_TENANT_INFO', name: '企业外呼' },
  { code: 'CRM_CUSTOMER_INFO', name: '我的外呼' },
  { code: 'CRM_SEAT_ALLOCATION', name: '坐席配置修改' },
  { code: 'UI_DATA_TABLE', name: '数据表格' },
  { code: 'UI_DATA_DRAW', name: '数据图表' },
  { code: 'CRM_CALL_TASK_DELETE', name: '呼叫任务删除' },
  { code: 'CRM_CALL_TASK_STOP', name: '呼叫任务停止' },
  { code: 'CRM_CALL_TASK_START', name: '呼叫任务开始' },
  { code: 'CRM_CREATE_CALL_TASK', name: '呼叫任务创建、复制' },
  { code: 'CRM_CALL_TASK_EDIT', name: '呼叫任务编辑' },
  { code: 'CRM_CALL_TASK_ADD_PHONE_NUMBER', name: '添加号码' },
  { code: 'CRM_CALL_BLACK_LIST_ADD', name: '添加呼叫黑名单' },
  { code: 'CRM_CALL_BLACK_LIST_DELETE', name: '删除呼叫黑名单' },
  { code: 'CRM_CALL_BLACK_LIST_EXPORT', name: '导出呼叫黑名单' },
  { code: 'UI_ADD_TO_CALL_TASK', name: '加入至呼叫任务' },
  { code: 'CRM_CALL_BLACK_LIST_ADD', name: '添加呼叫黑名单' },
  { code: 'CRM_EXPORT_ALL_CALL_RECORD', name: '导出全部呼叫' },
  { code: 'CRM_EXPORT_SELECTED_CALL_RECORD', name: '导出选中呼叫' },
  { code: 'CRM_TURN_CUSTOMER', name: '转为客户' },
  { code: 'CRM_TURN_SHARE', name: '转入共享线索' },
  { code: 'UI_RULE_CONFIG', name: '意向规则设置' },
  { code: 'UI_MANUAL_ADD_CLUE', name: '手动添加线索' },
  { code: 'CRM_DELETE_CLUE', name: '删除线索，删除客户' },
  { code: 'CRM_BRING_CLUE', name: '领取线索' },
  { code: 'UI_CLIENT_ADD', name: '添加客户' },
  // { code: 'CRM_DELETE_CLUE', name: '删除客户' },
  { code: 'CRM_CALL_NUMBER', name: '拨打电话' },
  { code: 'CRM_MODIFY_SPEECH_TEMPLATE_STATE', name: '更改语音模板状态' }
]

export const routerPermission = {
  // code为权限字段，为空代表始终有权限 'routeName': { code: 'UI_DATA_REPORT', name: '数据报表' },
  'dashboard': { code: 'UI_INTELLIGENT_ANALYSIS', name: '智能分析' },
  'spend': { code: '', name: '消费记录' }
}

