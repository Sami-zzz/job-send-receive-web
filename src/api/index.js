import { get, post, put } from './http'


// 用户注册
export const userRegister = (params) => post('/user/userRegister', params);

//判断是否登录成功
export const getLoginStatus = (params) => post('/user/userLogin', params);

export const getUserJobs = (currentPage, pageSize) => get('/job/selectSubmit/' + currentPage + '/' + pageSize);

//获取个人信息
export const getUserInfoById = (params) => get('/user/selectPersonInfo?id=' + params);
//获取所有方向
export const getAllDirectionTest = (params) => get('/userDirection/selectUserDirection', params);
//获取所有组别
export const getAllGroupTest = (params) => get('/userGroup/selectUserGroup', params);
//获取个人作业
export const getAllUserJobs = (params) => get('/userJob/select?userId=' + params);
//作业确认
export const getConfirmJobs = (userId, jobId) => post('/userJob/confirm/' + userId + '/' + jobId)
//发布作业
export const postJob = (params) => post('/job/addJob', params)
//关闭作业
export const postCloseJob = (params) => post('/job/closeJob', params)
//获取老师已发布的作业
export const getAllJob = (currentPage, pageSize) => get('/job/' + currentPage + '/' + pageSize);
//获取所有成员信息
export const getAllMerber = (currentPage, pageSize) => get('/user/' + currentPage + '/' + pageSize);
//获取所有作业
export const getAllJobs = (currentPage, pageSize) => get('/userJob/selectSubmit/' + currentPage + '/' + pageSize);

//用户获取所有历史作业
export const selectJobs = (currentPage, pageSize) => get('/userJob/selectJobs/' + currentPage + '/' + pageSize);

//获取学生申请推迟的作业
export const userJobPostpone = (currentPage, pageSize) => get('/userJobPostpone/userJobPostpone/' + currentPage + '/' + pageSize);
//修改作业
export const postUpdateJob = (params) => post('/job/updateJob', params);
//管理员审批延期申请
export const postUserPostpone = (params) => post('/jobPostpone/approve', params);
//更换组别
export const changeGroup = (params) => post('/userPostpone/add', params);
//更换方向
export const changeDirection = (params) => post('/userPostpone/add', params);

//申请作业延期
export const addUserJobPostpone = (params) => post('/userJobPostpone/add', params);

//用户修改资料
export const userUpdate = (params) => post('/user/userUpdate', params);

//超级管理员查看所有用户申请
export const selectAllPostpone = (currentPage, pageSize) => get('/userPostpone/selectAllPostpone/' + currentPage + '/' + pageSize);

//超管审批转方向、组申请
export const approveApplication = (params) => post('/userPostpone/approve', params);

//获取所有权限信息
export const selectUserRole = (params) => get('/userRole/selectUserRole', params);

//超管更改用户权限
export const updateUserRole = (params) => post('/userRole/updateUserRole', params);

//超管删除用户
export const userDelete = (params) => post('/user/userDelete', params);

//通过条件获取用户信息
export const getUserInfo = (currentPage, pageSize) => get('/user/' + currentPage + '/' + pageSize);

//用户上传文件
export const userUpload = (params) => post('/userJob/uploadFile', params);

//下载作业文件
export const downloadFile = (params) => get('/userJob/downloadFile', params);


//添加透明评价
export const addAssessment = (params) => post('/assessment/addAssessment', params);

//添加隐藏评价
export const addHideAssessment = (params) => post('/assessment/addHideAssessment', params);

//删除评价
export const deleteAssessment = (params) => post('/assessment/deleteAssessment', params);

//修改评价
export const updateAssessment = (params) => post('/assessment/updateAssessment', params);

//查询评价
export const getAssessment = (currentPage, pageSize) => get('/assessment/' + currentPage + '/' + pageSize);

