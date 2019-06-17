import { MessageBox } from 'element-ui';
/**
 * @description 删除数据时的提示语
 * @param customClass {string} MessageBox 自定义样式
 * @param message {string} MessageBox 消息正文内容
 * @param title {string} MessageBox 标题
 * @returns 返回基于Promise的响应事件
 */
export function deleteData(customClass, message = '确定删除此条数据吗？', title = '',) {
  return MessageBox.confirm(message, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    showClose: false,
    closeOnClickModal: false,
    customClass: customClass
  })
}