<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
                  <el-form-item label="公司id" prop="companyId">
                    <el-input
                        v-model="queryParams.companyId"
                        placeholder="请输入公司id"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="菜单标签" prop="systemLabel">
                    <el-input
                        v-model="queryParams.systemLabel"
                        placeholder="请输入菜单标签"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="系统名称" prop="systemName">
                    <el-input
                        v-model="queryParams.systemName"
                        placeholder="请输入系统名称"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="系统logo" prop="systemLogo">
                    <el-input
                        v-model="queryParams.systemLogo"
                        placeholder="请输入系统logo"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="是否为默认系统" prop="defaultFlag">
                    <el-input
                        v-model="queryParams.defaultFlag"
                        placeholder="请输入是否为默认系统"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="系统登录页" prop="loginPath">
                    <el-input
                        v-model="queryParams.loginPath"
                        placeholder="请输入系统登录页"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="状态" prop="deleted">
                    <el-input
                        v-model="queryParams.deleted"
                        placeholder="请输入状态"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="创建人" prop="createdBy">
                    <el-input
                        v-model="queryParams.createdBy"
                        placeholder="请输入创建人"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="创建时间" prop="createdTime">
                    <el-date-picker clearable
                                    v-model="queryParams.createdTime"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder="请选择创建时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="更新人" prop="updatedBy">
                    <el-input
                        v-model="queryParams.updatedBy"
                        placeholder="请输入更新人"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="更新时间" prop="updatedTime">
                    <el-date-picker clearable
                                    v-model="queryParams.updatedTime"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder="请选择更新时间">
                    </el-date-picker>
                  </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['customize:systems:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['customize:systems:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['customize:systems:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['customize:systems:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="systemsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="公司id" align="center" prop="companyId" />
              <el-table-column label="系统主键" align="center" prop="systemId" />
              <el-table-column label="菜单标签" align="center" prop="systemLabel" />
              <el-table-column label="系统名称" align="center" prop="systemName" />
              <el-table-column label="系统logo" align="center" prop="systemLogo" />
              <el-table-column label="是否为默认系统" align="center" prop="defaultFlag" />
              <el-table-column label="系统登录页" align="center" prop="loginPath" />
              <el-table-column label="登录方式 账密/微信/QQ/钉钉/其他" align="center" prop="loginType" />
              <el-table-column label="状态" align="center" prop="deleted" />
              <el-table-column label="创建人" align="center" prop="createdBy" />
              <el-table-column label="创建时间" align="center" prop="createdTime" width="180">
                <template #default="scope">
                  <span>{{ parseTime(scope.row.createdTime, '{y}-{m}-{d}') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="更新人" align="center" prop="updatedBy" />
              <el-table-column label="更新时间" align="center" prop="updatedTime" width="180">
                <template #default="scope">
                  <span>{{ parseTime(scope.row.updatedTime, '{y}-{m}-{d}') }}</span>
                </template>
              </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['customize:systems:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['customize:systems:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />

    <!-- 添加或修改系统对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="systemsRef" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="公司id" prop="companyId">
                          <el-input v-model="form.companyId" placeholder="请输入公司id" />
                        </el-form-item>
                        <el-form-item label="菜单标签" prop="systemLabel">
                          <el-input v-model="form.systemLabel" placeholder="请输入菜单标签" />
                        </el-form-item>
                        <el-form-item label="系统名称" prop="systemName">
                          <el-input v-model="form.systemName" placeholder="请输入系统名称" />
                        </el-form-item>
                        <el-form-item label="系统logo" prop="systemLogo">
                          <el-input v-model="form.systemLogo" placeholder="请输入系统logo" />
                        </el-form-item>
                        <el-form-item label="是否为默认系统" prop="defaultFlag">
                          <el-input v-model="form.defaultFlag" placeholder="请输入是否为默认系统" />
                        </el-form-item>
                        <el-form-item label="系统登录页" prop="loginPath">
                          <el-input v-model="form.loginPath" placeholder="请输入系统登录页" />
                        </el-form-item>
                        <el-form-item label="状态" prop="deleted">
                          <el-input v-model="form.deleted" placeholder="请输入状态" />
                        </el-form-item>
                        <el-form-item label="创建人" prop="createdBy">
                          <el-input v-model="form.createdBy" placeholder="请输入创建人" />
                        </el-form-item>
                        <el-form-item label="创建时间" prop="createdTime">
                          <el-date-picker clearable
                                          v-model="form.createdTime"
                                          type="date"
                                          value-format="YYYY-MM-DD"
                                          placeholder="请选择创建时间">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="更新人" prop="updatedBy">
                          <el-input v-model="form.updatedBy" placeholder="请输入更新人" />
                        </el-form-item>
                        <el-form-item label="更新时间" prop="updatedTime">
                          <el-date-picker clearable
                                          v-model="form.updatedTime"
                                          type="date"
                                          value-format="YYYY-MM-DD"
                                          placeholder="请选择更新时间">
                          </el-date-picker>
                        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Systems">
  import { listSystems, getSystems, delSystems, addSystems, updateSystems } from "@/api/customize/systems";

  const { proxy } = getCurrentInstance();

  const systemsList = ref([]);
  const open = ref(false);
  const loading = ref(true);
  const showSearch = ref(true);
  const ids = ref([]);
  const single = ref(true);
  const multiple = ref(true);
  const total = ref(0);
  const title = ref("");

  const data = reactive({
    form: {},
    queryParams: {
      pageNum: 1,
      pageSize: 10,
                    companyId: null,
                    systemLabel: null,
                    systemName: null,
                    systemLogo: null,
                    defaultFlag: null,
                    loginPath: null,
                    loginType: null,
                    deleted: null,
                    createdBy: null,
                    createdTime: null,
                    updatedBy: null,
                    updatedTime: null
    },
    rules: {
                    companyId: [
                { required: true, message: "公司id不能为空", trigger: "blur" }
              ],
                    systemName: [
                { required: true, message: "系统名称不能为空", trigger: "blur" }
              ],
                    defaultFlag: [
                { required: true, message: "是否为默认系统不能为空", trigger: "blur" }
              ],
                    deleted: [
                { required: true, message: "状态不能为空", trigger: "blur" }
              ],
    }
  });

  const { queryParams, form, rules } = toRefs(data);

  /** 查询系统列表 */
  function getList() {
    loading.value = true;
    listSystems(queryParams.value).then(response => {
            systemsList.value = response.rows;
      total.value = response.total;
      loading.value = false;
    });
  }

  // 取消按钮
  function cancel() {
    open.value = false;
    reset();
  }

  // 表单重置
  function reset() {
    form.value = {
                    companyId: null,
                    systemId: null,
                    systemLabel: null,
                    systemName: null,
                    systemLogo: null,
                    defaultFlag: null,
                    loginPath: null,
                    loginType: null,
                    deleted: null,
                    createdBy: null,
                    createdTime: null,
                    updatedBy: null,
                    updatedTime: null
    };
    proxy.resetForm("systemsRef");
  }

  /** 搜索按钮操作 */
  function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
  }

  /** 重置按钮操作 */
  function resetQuery() {
    proxy.resetForm("queryRef");
    handleQuery();
  }

  // 多选框选中数据
  function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.systemId);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
  }

  /** 新增按钮操作 */
  function handleAdd() {
    reset();
    open.value = true;
    title.value = "添加系统";
  }

  /** 修改按钮操作 */
  function handleUpdate(row) {
    reset();
    const _systemId = row.systemId || ids.value
    getSystems(_systemId).then(response => {
      form.value = response.data;
      open.value = true;
      title.value = "修改系统";
    });
  }

  /** 提交按钮 */
  function submitForm() {
    proxy.$refs["systemsRef"].validate(valid => {
      if (valid) {
        if (form.value.systemId != null) {
          updateSystems(form.value).then(response => {
            proxy.$modal.msgSuccess("修改成功");
            open.value = false;
            getList();
          });
        } else {
          addSystems(form.value).then(response => {
            proxy.$modal.msgSuccess("新增成功");
            open.value = false;
            getList();
          });
        }
      }
    });
  }

  /** 删除按钮操作 */
  function handleDelete(row) {
    const _systemIds = row.systemId || ids.value;
    proxy.$modal.confirm('是否确认删除系统编号为"' + _systemIds + '"的数据项？').then(function() {
      return delSystems(_systemIds);
    }).then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    }).catch(() => {});
  }

  /** 导出按钮操作 */
  function handleExport() {
    proxy.download('customize/systems/export', {
      ...queryParams.value
    }, `systems_${new Date().getTime()}.xlsx`)
  }

  getList();
</script>
