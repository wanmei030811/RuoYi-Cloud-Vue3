<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
                  <el-form-item label="字典排序" prop="dictSort">
                    <el-input
                        v-model="queryParams.dictSort"
                        placeholder="请输入字典排序"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="字典标签" prop="dictLabel">
                    <el-input
                        v-model="queryParams.dictLabel"
                        placeholder="请输入字典标签"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="字典键值" prop="dictValue">
                    <el-input
                        v-model="queryParams.dictValue"
                        placeholder="请输入字典键值"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="样式属性" prop="cssClass">
                    <el-input
                        v-model="queryParams.cssClass"
                        placeholder="请输入样式属性"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="表格回显样式" prop="listClass">
                    <el-input
                        v-model="queryParams.listClass"
                        placeholder="请输入表格回显样式"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="是否默认" prop="isDefault">
                    <el-input
                        v-model="queryParams.isDefault"
                        placeholder="请输入是否默认"
                        clearable
                        @keyup.enter="handleQuery"
                    />
                  </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['customize:data:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['customize:data:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['customize:data:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['customize:data:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
              <el-table-column label="字典编码" align="center" prop="dictCode"/>
              <el-table-column label="字典排序" align="center" prop="dictSort"/>
              <el-table-column label="字典标签" align="center" prop="dictLabel"/>
              <el-table-column label="字典键值" align="center" prop="dictValue"/>
              <el-table-column label="字典类型" align="center" prop="dictType"/>
              <el-table-column label="样式属性" align="center" prop="cssClass"/>
              <el-table-column label="表格回显样式" align="center" prop="listClass"/>
              <el-table-column label="是否默认" align="center" prop="isDefault"/>
              <el-table-column label="状态" align="center" prop="status"/>
              <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['customize:data:edit']"
          >修改
          </el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['customize:data:remove']"
          >删除
          </el-button>
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

    <!-- 添加或修改字典数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="字典排序" prop="dictSort">
                          <el-input v-model="form.dictSort" placeholder="请输入字典排序"/>
                        </el-form-item>
                        <el-form-item label="字典标签" prop="dictLabel">
                          <el-input v-model="form.dictLabel" placeholder="请输入字典标签"/>
                        </el-form-item>
                        <el-form-item label="字典键值" prop="dictValue">
                          <el-input v-model="form.dictValue" placeholder="请输入字典键值"/>
                        </el-form-item>
                        <el-form-item label="样式属性" prop="cssClass">
                          <el-input v-model="form.cssClass" placeholder="请输入样式属性"/>
                        </el-form-item>
                        <el-form-item label="表格回显样式" prop="listClass">
                          <el-input v-model="form.listClass" placeholder="请输入表格回显样式"/>
                        </el-form-item>
                        <el-form-item label="是否默认" prop="isDefault">
                          <el-input v-model="form.isDefault" placeholder="请输入是否默认"/>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
                        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getData, listData} from "@/api/";

  export default {
    name: "Data",
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 字典数据表格数据
              dataList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
                        dictSort: null,
                        dictLabel: null,
                        dictValue: null,
                        dictType: null,
                        cssClass: null,
                        listClass: null,
                        isDefault: null,
                        status: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询字典数据列表 */
      getList() {
        this.loading = true;
        listData(this.queryParams).then(response => {
          this.dataList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
                        dictCode: null,
                        dictSort: null,
                        dictLabel: null,
                        dictValue: null,
                        dictType: null,
                        cssClass: null,
                        listClass: null,
                        isDefault: null,
                        status: null,
                        createBy: null,
                        createTime: null,
                        updateBy: null,
                        updateTime: null,
                        remark: null
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.dictCode)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加字典数据";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const dictCode = row.dictCode || this.ids
        getData(dictCode).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改字典数据";
        });
      },
      /** 提交按钮 */
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.dictCode != null) {
              updateData(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addData(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const dictCodes = row.dictCode || this.ids;
        this.$modal.confirm('是否确认删除字典数据编号为"' + dictCodes + '"的数据项？').then(function() {
          return delData(dictCodes);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
  /** 导出按钮操作 */
  handleExport() {
    this.download('customize/data/export', {
      ...this.queryParams
    }, `data_${new Date().getTime()}.xlsx`)
  }
  }
  };
</script>