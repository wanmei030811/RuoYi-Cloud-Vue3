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
                  <el-form-item label="菜单id" prop="menuId">
                    <el-input
                        v-model="queryParams.menuId"
                        placeholder="请输入菜单id"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="页面id" prop="pageId">
                    <el-input
                        v-model="queryParams.pageId"
                        placeholder="请输入页面id"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="字段标签" prop="fieldLabel">
                    <el-input
                        v-model="queryParams.fieldLabel"
                        placeholder="请输入字段标签"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="字段名字" prop="fieldName">
                    <el-input
                        v-model="queryParams.fieldName"
                        placeholder="请输入字段名字"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="默认值" prop="defaultValue">
                    <el-input
                        v-model="queryParams.defaultValue"
                        placeholder="请输入默认值"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="是否为搜索字段" prop="selectFlag">
                    <el-input
                        v-model="queryParams.selectFlag"
                        placeholder="请输入是否为搜索字段"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="是否为表格字段" prop="tableFlag">
                    <el-input
                        v-model="queryParams.tableFlag"
                        placeholder="请输入是否为表格字段"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="新增时时是否展示" prop="addFlag">
                    <el-input
                        v-model="queryParams.addFlag"
                        placeholder="请输入新增时时是否展示"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="修改时是否展示" prop="updateFlag">
                    <el-input
                        v-model="queryParams.updateFlag"
                        placeholder="请输入修改时是否展示"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="详情时是否展示" prop="viewFlag">
                    <el-input
                        v-model="queryParams.viewFlag"
                        placeholder="请输入详情时是否展示"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="修改时是否禁止编辑" prop="updateReadonlyFlag">
                    <el-input
                        v-model="queryParams.updateReadonlyFlag"
                        placeholder="请输入修改时是否禁止编辑"
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
            v-hasPermi="['customize:field:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['customize:field:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['customize:field:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['customize:field:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fieldList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="公司id" align="center" prop="companyId" />
              <el-table-column label="系统id" align="center" prop="systemId" />
              <el-table-column label="菜单id" align="center" prop="menuId" />
              <el-table-column label="页面id" align="center" prop="pageId" />
              <el-table-column label="字段主键" align="center" prop="fieldId" />
              <el-table-column label="字段标签" align="center" prop="fieldLabel" />
              <el-table-column label="字段名字" align="center" prop="fieldName" />
              <el-table-column label="字段类型" align="center" prop="fieldType" />
              <el-table-column label="默认值" align="center" prop="defaultValue" />
              <el-table-column label="是否为搜索字段" align="center" prop="selectFlag" />
              <el-table-column label="是否为表格字段" align="center" prop="tableFlag" />
              <el-table-column label="新增时时是否展示" align="center" prop="addFlag" />
              <el-table-column label="修改时是否展示" align="center" prop="updateFlag" />
              <el-table-column label="详情时是否展示" align="center" prop="viewFlag" />
              <el-table-column label="修改时是否禁止编辑" align="center" prop="updateReadonlyFlag" />
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
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['customize:field:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['customize:field:remove']">删除</el-button>
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

    <!-- 添加或修改字段对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="fieldRef" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="公司id" prop="companyId">
                          <el-input v-model="form.companyId" placeholder="请输入公司id" />
                        </el-form-item>
                        <el-form-item label="系统id" prop="systemId">
                          <el-input v-model="form.systemId" placeholder="请输入系统id" />
                        </el-form-item>
                        <el-form-item label="菜单id" prop="menuId">
                          <el-input v-model="form.menuId" placeholder="请输入菜单id" />
                        </el-form-item>
                        <el-form-item label="页面id" prop="pageId">
                          <el-input v-model="form.pageId" placeholder="请输入页面id" />
                        </el-form-item>
                        <el-form-item label="字段标签" prop="fieldLabel">
                          <el-input v-model="form.fieldLabel" placeholder="请输入字段标签" />
                        </el-form-item>
                        <el-form-item label="字段名字" prop="fieldName">
                          <el-input v-model="form.fieldName" placeholder="请输入字段名字" />
                        </el-form-item>
                        <el-form-item label="默认值" prop="defaultValue">
                          <el-input v-model="form.defaultValue" placeholder="请输入默认值" />
                        </el-form-item>
                        <el-form-item label="是否为搜索字段" prop="selectFlag">
                          <el-input v-model="form.selectFlag" placeholder="请输入是否为搜索字段" />
                        </el-form-item>
                        <el-form-item label="是否为表格字段" prop="tableFlag">
                          <el-input v-model="form.tableFlag" placeholder="请输入是否为表格字段" />
                        </el-form-item>
                        <el-form-item label="新增时时是否展示" prop="addFlag">
                          <el-input v-model="form.addFlag" placeholder="请输入新增时时是否展示" />
                        </el-form-item>
                        <el-form-item label="修改时是否展示" prop="updateFlag">
                          <el-input v-model="form.updateFlag" placeholder="请输入修改时是否展示" />
                        </el-form-item>
                        <el-form-item label="详情时是否展示" prop="viewFlag">
                          <el-input v-model="form.viewFlag" placeholder="请输入详情时是否展示" />
                        </el-form-item>
                        <el-form-item label="修改时是否禁止编辑" prop="updateReadonlyFlag">
                          <el-input v-model="form.updateReadonlyFlag" placeholder="请输入修改时是否禁止编辑" />
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

<script setup name="Field">
  import { listField, getField, delField, addField, updateField } from "@/api/customize/field";

  const { proxy } = getCurrentInstance();

  const fieldList = ref([]);
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
                    menuId: null,
                    pageId: null,
                    fieldLabel: null,
                    fieldName: null,
                    fieldType: null,
                    defaultValue: null,
                    selectFlag: null,
                    tableFlag: null,
                    addFlag: null,
                    updateFlag: null,
                    viewFlag: null,
                    updateReadonlyFlag: null,
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
                    menuId: [
                { required: true, message: "菜单id不能为空", trigger: "blur" }
              ],
                    pageId: [
                { required: true, message: "页面id不能为空", trigger: "blur" }
              ],
                    fieldLabel: [
                { required: true, message: "字段标签不能为空", trigger: "blur" }
              ],
                    fieldType: [
                { required: true, message: "字段类型不能为空", trigger: "change" }
              ],
                    selectFlag: [
                { required: true, message: "是否为搜索字段不能为空", trigger: "blur" }
              ],
                    tableFlag: [
                { required: true, message: "是否为表格字段不能为空", trigger: "blur" }
              ],
                    addFlag: [
                { required: true, message: "新增时时是否展示不能为空", trigger: "blur" }
              ],
                    updateFlag: [
                { required: true, message: "修改时是否展示不能为空", trigger: "blur" }
              ],
                    viewFlag: [
                { required: true, message: "详情时是否展示不能为空", trigger: "blur" }
              ],
                    updateReadonlyFlag: [
                { required: true, message: "修改时是否禁止编辑不能为空", trigger: "blur" }
              ],
                    deleted: [
                { required: true, message: "状态不能为空", trigger: "blur" }
              ],
    }
  });

  const { queryParams, form, rules } = toRefs(data);

  /** 查询字段列表 */
  function getList() {
    loading.value = true;
    listField(queryParams.value).then(response => {
            fieldList.value = response.rows;
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
                    pageId: null,
                    fieldId: null,
                    fieldLabel: null,
                    fieldName: null,
                    fieldType: null,
                    defaultValue: null,
                    selectFlag: null,
                    tableFlag: null,
                    addFlag: null,
                    updateFlag: null,
                    viewFlag: null,
                    updateReadonlyFlag: null,
                    deleted: null,
                    createdBy: null,
                    createdTime: null,
                    updatedBy: null,
                    updatedTime: null
    };
    proxy.resetForm("fieldRef");
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
    ids.value = selection.map(item => item.fieldId);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
  }

  /** 新增按钮操作 */
  function handleAdd() {
    reset();
    open.value = true;
    title.value = "添加字段";
  }

  /** 修改按钮操作 */
  function handleUpdate(row) {
    reset();
    const _fieldId = row.fieldId || ids.value
    getField(_fieldId).then(response => {
      form.value = response.data;
      open.value = true;
      title.value = "修改字段";
    });
  }

  /** 提交按钮 */
  function submitForm() {
    proxy.$refs["fieldRef"].validate(valid => {
      if (valid) {
        if (form.value.fieldId != null) {
          updateField(form.value).then(response => {
            proxy.$modal.msgSuccess("修改成功");
            open.value = false;
            getList();
          });
        } else {
          addField(form.value).then(response => {
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
    const _fieldIds = row.fieldId || ids.value;
    proxy.$modal.confirm('是否确认删除字段编号为"' + _fieldIds + '"的数据项？').then(function() {
      return delField(_fieldIds);
    }).then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    }).catch(() => {});
  }

  /** 导出按钮操作 */
  function handleExport() {
    proxy.download('customize/field/export', {
      ...queryParams.value
    }, `field_${new Date().getTime()}.xlsx`)
  }

  getList();
</script>
