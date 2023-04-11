import { baseUrl, get, post, put, remove } from './axios'

export const uploadUrl = baseUrl + 'api/v1/uploads'

/**
 * 登录
 * @param {*} data
 * @returns
 */
export const login = (data) => post('api/v1/auth/login', data)

/**
 * 认证登录
 * @param {*} ticket
 * @param {*} data
 * @returns
 */
export const loginByAuth = (ticket, data) =>
  post(`api/v1/auth/login/ticket/${ticket}`, data)

/**
 * 退出登录
 * @param {*} data
 * @returns
 */
export const logout = (data) => post('api/v1/auth/logout', data)

/**
 * 获取当前用户信息
 * @param {*} data
 * @returns
 */
export const getUserInfo = (data) => get('api/v1/user/me', data)

/**
 * 更新当前用户信息
 * @param {*} data
 * @returns
 */
export const updateUserInfo = (data) => put('api/v1/user/me', data)

/**
 * 修改密码
 * @param {*} data
 * @returns
 */
export const changePassword = (data) => put('api/v1/user/me/reset', data)

/**
 * 获取下拉列表
 * @param {*} name  项目类型：project_class，院系：college，部门：department
 * @param {*} data
 * @returns
 */
export const getDownList = (name, data) => get(`api/v1/info/${name}/down`, data)

/**
 * 批量获取下拉列表
 * @param {*} name
 * @param {*} data
 * @returns
 */
export const getAllDownList = (data) => get('api/v1/info/downs', data)

/**
 * 获取账号列表
 * @param {*} data
 * @returns
 */
export const getAccountList = (data) => get('api/v1/accounts', data)

/**
 * 新增账号
 * @param {*} data
 * @returns
 */
export const createAccount = (data) => post('api/v1/account', data)

/**
 * 获取账号信息
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getAccountInfo = (id, data) => get(`api/v1/account/${id}`, data)

/**
 * 编辑账号信息
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const editAccountInfo = (id, data) => put(`api/v1/account/${id}`, data)

/**
 * 批量重置账号密码
 * @param {*} data
 * @returns
 */
export const resetBatchAccountPassword = (data) =>
  put('api/v1/account/reset_pwd', data)

/**
 * 启用、禁用账号
 * @param {*} id
 * @param {*} type enable\disable
 * @param {*} data
 * @returns
 */
export const toggleAccountEnable = (id, type, data) =>
  put(`api/v1/account/${id}/${type}`, data)

/**
 * 获取账号下拉列表
 * @param {*} data
 * @returns
 */
export const getAccountDownList = (data) => get('api/v1/accounts_down', data)

/**
 * 获取专家组列表
 * @param {*} data
 * @returns
 */
export const getExpertGroupList = (data) => get('api/v1/expert_groups', data)

/**
 * 创建专家组
 * @param {*} data
 * @returns
 */
export const createExpertGroup = (data) => post('api/v1/expert_group', data)

/**
 * 启用、禁用专家组
 * @param {*} id
 * @param {*} type
 * @param {*} data
 * @returns
 */
export const toggleExpertGroupEnable = (id, type, data) =>
  put(`api/v1/expert_group/${id}/${type}`, data)

/**
 * 获取可用的专家组下拉列表
 * @param {*} data
 * @returns
 */
export const getExpertGroupDownList = (data) =>
  get('api/v1/expert_groups/down', data)

/**
 * 获取基本配置信息
 * @param {*} data
 * @returns
 */
export const getBaseInfo = (data) => get('api/v1/config_info', data)

/**
 * 提交基本配置信息
 * @param {*} data
 * @returns
 */
export const editBaseInfo = (data) => put('api/v1/config_info', data)

/**
 * 获取项目申报列表
 * @param {*} data
 * @returns
 */
export const getApplicationList = (data) => get('api/v1/projects', data)

/**
 * 获取我的全部项目申报列表
 * 项目负责人调用
 * @param {*} data
 * @returns
 */
export const getMyApplicationList = (data) =>
  get('api/v1/projects/my_list', data)

/**
 * 获取退回的项目申报列表
 * @param {*} data
 * @returns
 */
export const getReturnedApplicationList = (data) =>
  get('api/v1/projects/deprecated', data)

/**
 * 获取项目的退回记录详情
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getReturnedApplicationDetail = (id, data) =>
  get(`api/v1/project/${id}/deprecated`, data)

/**
 * 创建项目申报
 * @param {*} data
 * @returns
 */
export const createApplication = (data) => post('api/v1/project', data)

/**
 * 获取项目申报详情
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getApplicationDetail = (id, data) =>
  get(`api/v1/project/${id}`, data)

/**
 * 编辑项目申报，保存为草稿
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const editApplication = (id, data) => put(`api/v1/project/${id}`, data)

/**
 * 提交项目申报到院系审核
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const submitApplicationToFaculty = (id, data) =>
  put(`api/v1/project/${id}/submit/to_college`, data)

/**
 * 提交并创建项目到院系审核
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const submitAndCreateApplicationToFaculty = (data) =>
  post('api/v1/project/submit/to_college', data)

/**
 * 院系退回
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const returnApplicationByFaculty = (id, data) =>
  put(`api/v1/project/${id}/return/college`, data)

/**
 * 提交项目申报到校级审核，批量
 * @param {*} data
 * @returns
 */
export const submitApplicationToUniversity = (data) =>
  post('api/v1/project/batch/submit/to_school', data)

/**
 * 校级退回
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const returnApplicationByUniversity = (id, data) =>
  put(`api/v1/project/${id}/return/school`, data)

/**
 * 学校接收，批量
 * @param {*} data
 * @returns
 */
export const acceptedApplicationByUniversity = (data) =>
  post('api/v1/project/batch/receive/to_school', data)

/**
 * 学校接收，全部
 * 提交项目申报到校级审核，全部
 * @param {*} data
 * @returns
 */
export const acceptedAllApplication = (data) =>
  post('api/v1/project/batch/receive/condition', data)

/**
 * 获取项目审核日志列表
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getApplicationLogs = (id, data) =>
  get(`api/v1/project/${id}/logs`, data)

/**
 * 获取待评审的项目下拉列表
 * @param {*} data
 * @returns
 */
export const getApplicationDownList = (data) =>
  get('api/v1/projects/assess/down', data)

/**
 * 获取评审任务列表
 * @param {*} data
 * @returns
 */
export const getReviewTaskList = (data) => get('api/v1/assesses', data)

/**
 * 创建评审任务
 * @param {*} data
 * @returns
 */
export const createReviewTask = (data) => post('api/v1/assess', data)

/**
 * 获取评审任务详情
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getReviewTaskDetail = (id, data) =>
  get(`api/v1/assess/${id}`, data)

/**
 * 更新评审任务截止时间
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const editReviewTaskEndAt = (id, data) =>
  put(`api/v1/assess/${id}`, data)

/**
 * 撤销评审任务
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const cancelReviewTask = (id, data) =>
  remove(`api/v1/assess/${id}`, data)

/**
 * 专家获取评审任务列表
 * @param {*} data
 * @returns
 */
export const getExpertTaskList = (data) =>
  get('api/v1/expert/assesses/my_list', data)

/**
 * 专家获取评审任务详情
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getExpertReviewTaskDetail = (id, data) =>
  get(`api/v1/expert/assess/${id}`, data)

/**
 * 保存评审任务结果
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const saveReviewTask = (id, data) =>
  post(`api/v1/expert/assess/${id}/save`, data)

/**
 * 提交评审结果
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const submitReviewTask = (id, data) =>
  post(`api/v1/expert/assess/${id}/submit`, data)

/**
 * 记录专家已阅读评审承诺
 * @param {*} data
 * @returns
 */
export const recordExpertRead = (data) => post('api/v1/log/click_read', data)

/**
 * 批量检查导入的项目负责人账号
 * 管理员使用
 * @param {*} data
 * @returns
 */
export const batchCheckProjectAccount = (data) =>
  post('api/v1/accounts/import_project/check', data)

/**
 * 批量检查导入的项目负责人账号
 * 院系审核人使用
 * @param {*} data
 * @returns
 */
export const batchCheckFacultyProjectAccount = (data) =>
  post('api/v1/accounts/import_project/college_check', data)

/**
 * 批量检查导入的院系审核人账号
 * 管理员使用
 * @param {*} data
 * @returns
 */
export const batchCheckFacultyAccount = (data) =>
  post('api/v1/accounts/import_college/check', data)

/**
 * 批量新增账号
 * @param {*} data
 * @returns
 */
export const batchCreateAccount = (data) => post('api/v1/accounts', data)

/**
 * 获取导出任务状态
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getExportTaskProgress = (id, data) =>
  get(`api/v1/task/${id}/ack`, data)

/**
 * 院系审核人
 * 导出项目申请书
 * @param {*} data
 * @returns
 */
export const exportPetition = (data) =>
  post('api/v1/task/export_petition', data)

/**
 * 院系审核人
 * 导出项目申报清单
 * @param {*} data
 * @returns
 */
export const exportProjectsByFaculty = (data) =>
  post('api/v1/task/export_projects/college', data)

/**
 * 校级审核人，院系审核人
 * 导出推荐校外专家
 * @param {*} data
 * @returns
 */
export const exportExperts = (data) =>
  post('api/v1/task/export_projects/external_experts', data)

/**
 * 校级审核人
 * 导出项目申报清单
 * @param {*} data
 * @returns
 */
export const exportProjectsByUniversity = (data) =>
  post('api/v1/task/export_projects/school', data)

/**
 * 校级审核人
 * 导出评审结果
 * @param {*} data
 * @returns
 */
export const exportTaskResult = (data) =>
  post('api/v1/task/export_assess/result', data)

/**
 * 批量检查导入的项目状态
 * @param {*} data
 * @returns
 */
export const batchCheckProjectStatus = (data) =>
  post('api/v1/projects/import_status/check', data)

/**
 * 批量导入项目状态
 * @param {*} data
 * @returns
 */
export const batchImportProjectStatus = (data) =>
  post('api/v1/projects/import_status', data)

/**
 * 获取我的任务书列表
 * @param {*} data
 * @returns
 */
export const getMyAssignmentList = (data) =>
  get('api/v1/taskbooks/my_list', data)

/**
 * 获取任务书列表
 * @param {*} data
 * @returns
 */
export const getAssignmentList = (data) => get('api/v1/taskbooks', data)

/**
 * 获取 `任务书-个人候选项目` 下拉列表
 * @param {*} data
 * @returns
 */
export const getAssignmentProjectList = (data) =>
  get('api/v1/info/candidate_taskbook_projects', data)

/**
 * 保存任务书
 * @param {*} data
 * @returns
 */
export const saveAssignment = (data) => put('api/v1/taskbooks/save', data)

/**
 * 提交任务书
 * @param {*} data
 * @returns
 */
export const submitAssignment = (data) => post('api/v1/taskbooks', data)

/**
 * 获取任务书详情
 * @param {*} data
 * @returns
 */
export const getAssignmentDetail = (id, data) =>
  get(`api/v1/taskbooks/${id}`, data)

/**
 * - 院系审核人批量提交任务书
 * - 校级审核人批量接收任务书
 * @param {*} data
 * @returns
 */
export const batchAcceptAssignment = (data) =>
  put('api/v1/taskbooks/allow', data)

/**
 * - 院系审核人全部提交任务书
 * - 校级审核人全部接收任务书
 * @param {*} data
 * @returns
 */
export const allAcceptAssignment = (data) =>
  put('api/v1/taskbooks/allow/condition', data)

/**
 * 退回任务书
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const returnAssignment = (id, data) =>
  put(`api/v1/taskbooks/${id}/reject`, data)

/**
 * - 院系审核人导出任务书清单
 * - 校级审核人导出任务书清单
 * - 详情导出任务书清单
 * @param {*} data
 * @returns
 */
export const exportAssignments = (data) =>
  post('api/v1/task/export_taskbooks/list', data)

/**
 * - 院系审核人导出任务书
 * - 校级审核人下载任务书
 * @param {*} data
 * @returns
 */
export const downloadAssignmentFiles = (data) =>
  post('api/v1/task/export_taskbooks', data)

/**
 * 获取`进展报告-个人候选`下拉选项
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getProgressProjectList = (data) =>
  get('api/v1/info/candidate_progress_reports', data)

/**
 * 保存进展报告
 * @param {*} data
 * @returns
 */
export const saveProgress = (data) => put('api/v1/progress_reports/save', data)

/**
 * 提交进展报告
 * @param {*} data
 * @returns
 */
export const submitProgress = (data) => post('api/v1/progress_reports', data)

/**
 * 获取进展报告详情
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getProgressDetail = (id, data) =>
  get(`api/v1/progress_reports/${id}`, data)

/**
 * 获取我的进展报告列表
 * @param {*} data
 * @returns
 */
export const getMyProgressList = (data) =>
  get('api/v1/progress_reports/my_list', data)

/**
 * 获取进展报告列表
 * @param {*} data
 * @returns
 */
export const getProgressList = (data) => get('api/v1/progress_reports/', data)

/**
 * - 院系审核人批量提交进展报告
 * - 校级审核人批量接收进展报告
 * @param {*} data
 * @returns
 */
export const batchAcceptProgress = (data) =>
  put('api/v1/progress_reports/allow', data)

/**
 * - 院系审核人全部提交进展报告
 * - 校级审核人全部提交进展报告
 * @param {*} data
 * @returns
 */
export const allAcceptProgress = (data) =>
  put('api/v1/progress_reports/allow/condition', data)

/**
 * 退回进展报告
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const returnProgress = (id, data) =>
  put(`api/v1/progress_reports/${id}/reject`, data)

/**
 * 获取`结题报告-个人候选`下拉选项
 * @param {*} data
 * @returns
 */
export const getSummaryProjectList = (data) =>
  get('api/v1/info/candidate_conclusion_reports', data)

/**
 * 保存结题报告
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const saveSummary = (data) => put('api/v1/conclusion_reports/save', data)

/**
 * 提交结题报告
 * @param {*} data
 * @returns
 */
export const submitSummary = (data) => post('api/v1/conclusion_reports', data)

/**
 * 获取结题报告详情
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const getSummaryDetail = (id, data) =>
  get(`api/v1/conclusion_reports/${id}`, data)

/**
 * - 院系审核人导出进展报告清单
 * - 校级审核人导出进展报告清单
 * - 详情导出进展报告清单
 * @param {*} data
 * @returns
 */
export const exportProgresses = (data) =>
  post('api/v1/task/export_progress/list', data)

/**
 * - 院系审核人导出进展报告
 * - 校级审核人下载进展报告
 * @param {*} data
 * @returns
 */
export const downloadProgressFiles = (data) =>
  post('api/v1/task/export_progress', data)

/**
 * 导出进展报告年度绩效评价
 * @param {*} data
 * @returns
 */
export const exportProgressEvaluation = (data) =>
  post('api/v1/task/export_progress/annual_results', data)

/**
 * 获取我的结题报告列表
 * @param {*} data
 * @returns
 */
export const getMySummaryList = (data) =>
  get('api/v1/conclusion_reports/my_list', data)

/**
 * 获取结题报告列表
 * @param {*} data
 * @returns
 */
export const getSummaryList = (data) => get('api/v1/conclusion_reports', data)

/**
 * - 院系审核人批量提交结题报告
 * - 校级审核人批量接收结题报告
 * @param {*} data
 * @returns
 */
export const batchAcceptSummary = (data) =>
  put('api/v1/conclusion_reports/allow', data)

/**
 * - 院系审核人全部提交结题报告
 * - 校级审核人全部接收结题报告
 * @param {*} data
 * @returns
 */
export const allAcceptSummary = (data) =>
  put('api/v1/conclusion_reports/allow/condition', data)

/**
 * 退回结题报告
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const returnSummary = (id, data) =>
  put(`api/v1/conclusion_reports/${id}/reject`, data)

/**
 * - 院系审核人导出结题报告清单
 * - 校级审核人导出结题报告清单
 * - 详情导出结题报告清单
 * @param {*} data
 * @returns
 */
export const exportSummaries = (data) =>
  post('api/v1/task/export_conclusion/list', data)

/**
 * - 院系审核人导出结题报告
 * - 校级审核人下载结题报告
 * @param {*} data
 * @returns
 */
export const downloadSummaryFiles = (data) =>
  post('api/v1/task/export_conclusion', data)

/**
 * 导出结题报告年度绩效评价
 * @param {*} data
 * @returns
 */
export const exportSummaryEvaluation = (data) =>
  post('api/v1/task/export_conclusion/annual_results', data)

/**
 * 导出专家鉴定
 * @param {*} data
 * @returns
 */
export const exportExpertAppraisal = (data) =>
  post('api/v1/task/export_expert_appraise', data)

/**
 * 批量检查导入的结题状态
 * @param {*} data
 * @returns
 */
export const batchCheckSummaryStatus = (data) =>
  post('api/v1/conclusion_reports/import/check', data)

/**
 * 批量导入结题状态
 * @param {*} data
 * @returns
 */
export const batchImportSummaryStatus = (data) =>
  post('api/v1/conclusion_reports/import', data)

/**
 * 批量检查导入的经费号信息
 * @param {*} data
 * @returns
 */
export const batchCheckBudget = (data) =>
  post('api/v1/funds/import/check', data)

/**
 * 批量导入经费号信息
 * @param {*} data
 * @returns
 */
export const batchImportBudget = (data) => post('api/v1/funds/import', data)

/**
 * 获取经费号列表
 * @param {*} data
 * @returns
 */
export const getBudgetList = (data) => get('api/v1/funds', data)

/**
 * 编辑经费号信息
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const editBudgetItem = (id, data) => put(`api/v1/funds/${id}`, data)

/**
 * 删除经费号信息
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const deleteBudgetItem = (id, data) => remove(`api/v1/funds/${id}`, data)
