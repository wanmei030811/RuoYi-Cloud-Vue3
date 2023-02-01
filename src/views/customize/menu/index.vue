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
                  <el-form-item label="系统id" prop="systemId">
                    <el-input
                        v-model="queryParams.systemId"
                        placeholder="请输入系统id"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="菜单标签" prop="menuLabel">
                    <el-input
                        v-model="queryParams.menuLabel"
                        placeholder="请输入菜单标签"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="菜单名称" prop="menuName">
                    <el-input
                        v-model="queryParams.menuName"
                        placeholder="请输入菜单名称"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="父菜单id" prop="parentId">
                    <el-input
                        v-model="queryParams.parentId"
                        placeholder="请输入父菜单id"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="父菜单名称" prop="parentName">
                    <el-input
                        v-model="queryParams.parentName"
                        placeholder="请输入父菜单名称"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="显示顺序" prop="orderNum">
                    <el-input
                        v-model="queryParams.orderNum"
                        placeholder="请输入显示顺序"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="路由地址" prop="path">
                    <el-input
                        v-model="queryParams.path"
                        placeholder="请输入路由地址"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="组件路径" prop="component">
                    <el-input
                        v-model="queryParams.component"
                        placeholder="请输入组件路径"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="路由参数" prop="query">
                    <el-input
                        v-model="queryParams.query"
                        placeholder="请输入路由参数"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="菜单图标" prop="icon">
                    <el-input
                        v-model="queryParams.icon"
                        placeholder="请输入菜单图标"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="权限字符串" prop="authority">
                    <el-input
                        v-model="queryParams.authority"
                        placeholder="请输入权限字符串"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="是否为外链" prop="frameFlag">
                    <el-input
                        v-model="queryParams.frameFlag"
                        placeholder="请输入是否为外链"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="是否缓存" prop="cacheFlag">
                    <el-input
                        v-model="queryParams.cacheFlag"
                        placeholder="请输入是否缓存"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="显示状态" prop="visible">
                    <el-input
                        v-model="queryParams.visible"
                        placeholder="请输入显示状态"
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
                  <el-form-item label="更新事件" prop="updatedTime">
                    <el-date-picker clearable
                                    v-model="queryParams.updatedTime"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder="请选择更新事件">
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
            v-hasPermi="['customize:menu:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['customize:menu:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['customize:menu:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['customize:menu:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="menuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="公司id" align="center" prop="companyId" />
              <el-table-column label="系统id" align="center" prop="systemId" />
              <el-table-column label="菜单主键" align="center" prop="menuId" />
              <el-table-column label="菜单标签" align="center" prop="menuLabel" />
              <el-table-column label="菜单名称" align="center" prop="menuName" />
              <el-table-column label="父菜单id" align="center" prop="parentId" />
              <el-table-column label="父菜单名称" align="center" prop="parentName" />
              <el-table-column label="显示顺序" align="center" prop="orderNum" />
              <el-table-column label="路由地址" align="center" prop="path" />
              <el-table-column label="组件路径" align="center" prop="component" />
              <el-table-column label="路由参数" align="center" prop="query" />
              <el-table-column label="菜单图标" align="center" prop="icon" />
              <el-table-column label="权限字符串" align="center" prop="authority" />
              <el-table-column label="是否为外链" align="center" prop="frameFlag" />
              <el-table-column label="是否缓存" align="center" prop="cacheFlag" />
              <el-table-column label="类型" align="center" prop="menuType" />
              <el-table-column label="显示状态" align="center" prop="visible" />
              <el-table-column label="状态" align="center" prop="deleted" />
              <el-table-column label="创建人" align="center" prop="createdBy" />
              <el-table-column label="创建时间" align="center" prop="createdTime" width="180">
                <template #default="scope">
                  <span>{{ parseTime(scope.row.createdTime, '{y}-{m}-{d}') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="更新人" align="center" prop="updatedBy" />
              <el-table-column label="更新事件" align="center" prop="updatedTime" width="180">
                <template #default="scope">
                  <span>{{ parseTime(scope.row.updatedTime, '{y}-{m}-{d}') }}</span>
                </template>
              </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['customize:menu:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['customize:menu:remove']">删除</el-button>
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

    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="menuRef" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="公司id" prop="companyId">
                          <el-input v-model="form.companyId" placeholder="请输入公司id" />
                        </el-form-item>
                        <el-form-item label="系统id" prop="systemId">
                          <el-input v-model="form.systemId" placeholder="请输入系统id" />
                        </el-form-item>
                        <el-form-item label="菜单标签" prop="menuLabel">
                          <el-input v-model="form.menuLabel" placeholder="请输入菜单标签" />
                        </el-form-item>
                        <el-form-item label="菜单名称" prop="menuName">
                          <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
                        </el-form-item>
                        <el-form-item label="父菜单id" prop="parentId">
                          <el-input v-model="form.parentId" placeholder="请输入父菜单id" />
                        </el-form-item>
                        <el-form-item label="显示顺序" prop="orderNum">
                          <el-input v-model="form.orderNum" placeholder="请输入显示顺序" />
                        </el-form-item>
                        <el-form-item label="路由地址" prop="path">
                          <el-input v-model="form.path" placeholder="请输入路由地址" />
                        </el-form-item>
                        <el-form-item label="组件路径" prop="component">
                          <el-input v-model="form.component" placeholder="请输入组件路径" />
                        </el-form-item>
                        <el-form-item label="路由参数" prop="query">
                          <el-input v-model="form.query" placeholder="请输入路由参数" />
                        </el-form-item>
                        <el-form-item label="菜单图标" prop="icon">
                          <el-input v-model="form.icon" placeholder="请输入菜单图标" />
                        </el-form-item>
                        <el-form-item label="权限字符串" prop="authority">
                          <el-input v-model="form.authority" placeholder="请输入权限字符串" />
                        </el-form-item>
                        <el-form-item label="是否为外链" prop="frameFlag">
                          <el-input v-model="form.frameFlag" placeholder="请输入是否为外链" />
                        </el-form-item>
                        <el-form-item label="是否缓存" prop="cacheFlag">
                          <el-input v-model="form.cacheFlag" placeholder="请输入是否缓存" />
                        </el-form-item>
                        <el-form-item label="显示状态" prop="visible">
                          <el-input v-model="form.visible" placeholder="请输入显示状态" />
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
                        <el-form-item label="更新事件" prop="updatedTime">
                          <el-date-picker clearable
                                          v-model="form.updatedTime"
                                          type="date"
                                          value-format="YYYY-MM-DD"
                                          placeholder="请选择更新事件">
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

<script setup name="Menu">
  import { listMenu, getMenu, delMenu, addMenu, updateMenu } from "@/api/customize/menu";

  const { proxy } = getCurrentInstance();

  const menuList = ref([]);
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
                    systemId: null,
                    menuLabel: null,
                    menuName: null,
                    parentId: null,
                    parentName: null,
                    orderNum: null,
                    path: null,
                    component: null,
                    query: null,
                    icon: null,
                    authority: null,
                    frameFlag: null,
                    cacheFlag: null,
                    menuType: null,
                    visible: null,
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
                    systemId: [
                { required: true, message: "系统id不能为空", trigger: "blur" }
              ],
                    menuLabel: [
                { required: true, message: "菜单标签不能为空", trigger: "blur" }
              ],
                    menuName: [
                { required: true, message: "菜单名称不能为空", trigger: "blur" }
              ],
                    orderNum: [
                { required: true, message: "显示顺序不能为空", trigger: "blur" }
              ],
                    path: [
                { required: true, message: "路由地址不能为空", trigger: "blur" }
              ],
                    component: [
                { required: true, message: "组件路径不能为空", trigger: "blur" }
              ],
                    frameFlag: [
                { required: true, message: "是否为外链不能为空", trigger: "blur" }
              ],
                    cacheFlag: [
                { required: true, message: "是否缓存不能为空", trigger: "blur" }
              ],
                    menuType: [
                { required: true, message: "类型不能为空", trigger: "change" }
              ],
                    visible: [
                { required: true, message: "显示状态不能为空", trigger: "blur" }
              ],
                    deleted: [
                { required: true, message: "状态不能为空", trigger: "blur" }
              ],
    }
  });

  const { queryParams, form, rules } = toRefs(data);

  /** 查询菜单列表 */
  function getList() {
    loading.value = true;
    listMenu(queryParams.value).then(response => {
            menuList.value = response.rows;
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
                    menuId: null,
                    menuLabel: null,
                    menuName: null,
                    parentId: null,
                    parentName: null,
                    orderNum: null,
                    path: null,
                    component: null,
                    query: null,
                    icon: null,
                    authority: null,
                    frameFlag: null,
                    cacheFlag: null,
                    menuType: null,
                    visible: null,
                    deleted: null,
                    createdBy: null,
                    createdTime: null,
                    updatedBy: null,
                    updatedTime: null
    };
    proxy.resetForm("menuRef");
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
    ids.value = selection.map(item => item.menuId);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
  }

  /** 新增按钮操作 */
  function handleAdd() {
    reset();
    open.value = true;
    title.value = "添加菜单";
  }

  /** 修改按钮操作 */
  function handleUpdate(row) {
    reset();
    const _menuId = row.menuId || ids.value
    getMenu(_menuId).then(response => {
      form.value = response.data;
      open.value = true;
      title.value = "修改菜单";
    });
  }

  /** 提交按钮 */
  function submitForm() {
    proxy.$refs["menuRef"].validate(valid => {
      if (valid) {
        if (form.value.menuId != null) {
          updateMenu(form.value).then(response => {
            proxy.$modal.msgSuccess("修改成功");
            open.value = false;
            getList();
          });
        } else {
          addMenu(form.value).then(response => {
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
    const _menuIds = row.menuId || ids.value;
    proxy.$modal.confirm('是否确认删除菜单编号为"' + _menuIds + '"的数据项？').then(function() {
      return delMenu(_menuIds);
    }).then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    }).catch(() => {});
  }

  /** 导出按钮操作 */
  function handleExport() {
    proxy.download('customize/menu/export', {
      ...queryParams.value
    }, `menu_${new Date().getTime()}.xlsx`)
  }

  getList();
</script>
