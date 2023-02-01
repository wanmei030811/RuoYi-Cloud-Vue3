<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="参数名称" prop="configName">
        <el-input
          v-model="queryParams.configName"
          placeholder="请输入参数名称"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="参数键名" prop="configKey">
        <el-input
          v-model="queryParams.configKey"
          placeholder="请输入参数键名"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="系统内置" prop="configType">
        <el-select
          v-model="queryParams.configType"
          placeholder="系统内置"
          clearable
        >
          <el-option
            v-for="dict in sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
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
          v-hasPermi="['system:config:add']"
          >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:config:edit']"
          >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:config:remove']"
          >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:config:export']"
          >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Refresh"
          @click="handleRefreshCache"
          v-hasPermi="['system:config:remove']"
          >刷新缓存
        </el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="configList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="参数主键" align="center" prop="configId" />
      <el-table-column
        label="参数名称"
        align="center"
        prop="configName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="参数键名"
        align="center"
        prop="configKey"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="参数键值" align="center" prop="configValue" />
      <el-table-column label="系统内置" align="center" prop="configType">
        <template #default="scope">
          <dict-tag :options="sys_yes_no" :value="scope.row.configType" />
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:config:edit']"
            >修改
          </el-button>
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:config:remove']"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body>
      <div>
        <el-button type="primary" @click="submitForm1">Submit</el-button>
        <v-form-render
          :form-json="formJson"
          :form-data="formData"
          :option-data="optionData"
          ref="vFormRef"
        >
        </v-form-render>
      </div>
      <el-form ref="configRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="参数名称" prop="configName">
          <el-input v-model="form.configName" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item label="参数键名" prop="configKey">
          <el-input v-model="form.configKey" placeholder="请输入参数键名" />
        </el-form-item>
        <el-form-item label="参数键值" prop="configValue">
          <el-input v-model="form.configValue" placeholder="请输入参数键值" />
        </el-form-item>
        <el-form-item label="系统内置" prop="configType">
          <el-radio-group v-model="form.configType">
            <el-radio
              v-for="dict in sys_yes_no"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
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

<script setup name="Config">
import {
  listConfig,
  getConfig,
  delConfig,
  addConfig,
  updateConfig,
  refreshCache,
} from "@/api/system/config";

import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
const formJson = reactive({
  widgetList: [
    {
      type: "static-text",
      icon: "static-text",
      formItemFlag: false,
      options: {
        name: "statictext111193",
        columnWidth: "200px",
        hidden: false,
        textContent: "主从表单",
        customClass: [],
        onCreated: "",
        onMounted: "",
        label: "static-text",
      },
      id: "statictext111193",
    },
    {
      type: "divider",
      icon: "divider",
      formItemFlag: false,
      options: {
        name: "divider102346",
        label: "",
        columnWidth: "200px",
        direction: "horizontal",
        contentPosition: "center",
        hidden: false,
        customClass: [],
        onCreated: "",
        onMounted: "",
      },
      id: "divider102346",
    },
    {
      type: "grid",
      category: "container",
      icon: "grid",
      cols: [
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "input",
              icon: "text-field",
              formItemFlag: true,
              options: {
                name: "input101987",
                label: "订单编号",
                labelAlign: "",
                type: "text",
                defaultValue: "",
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                readonly: true,
                disabled: false,
                hidden: false,
                clearable: true,
                showPassword: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                minLength: null,
                maxLength: null,
                showWordLimit: false,
                prefixIcon: "",
                suffixIcon: "",
                appendButton: false,
                appendButtonDisabled: false,
                buttonIcon: "el-icon-search",
                onCreated: "",
                onMounted: "",
                onInput: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "input101987",
            },
          ],
          options: {
            name: "gridCol78314",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: true,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-78314",
        },
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [],
          options: {
            name: "gridCol38113",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-38113",
        },
      ],
      options: {
        name: "grid109613",
        hidden: false,
        gutter: 12,
        customClass: [],
      },
      id: "grid109613",
    },
    {
      type: "grid",
      category: "container",
      icon: "grid",
      cols: [
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "input",
              icon: "text-field",
              formItemFlag: true,
              options: {
                name: "input95851",
                label: "购买客户",
                labelAlign: "",
                type: "text",
                defaultValue: "",
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                showPassword: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: [],
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                minLength: null,
                maxLength: null,
                showWordLimit: false,
                prefixIcon: "",
                suffixIcon: "",
                appendButton: true,
                appendButtonDisabled: false,
                buttonIcon: "el-icon-search",
                onCreated: "",
                onMounted: "",
                onInput: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "input95851",
            },
          ],
          options: {
            name: "gridCol9704",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-9704",
        },
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "date",
              icon: "date-field",
              formItemFlag: true,
              options: {
                name: "date75919",
                label: "下单日期",
                labelAlign: "",
                type: "date",
                defaultValue: null,
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                editable: false,
                format: "yyyy-MM-dd",
                valueFormat: "yyyy-MM-dd",
                required: false,
                validation: "",
                validationHint: "",
                customClass: [],
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                onCreated: "",
                onMounted: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "date75919",
            },
          ],
          options: {
            name: "gridCol67512",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: true,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-67512",
        },
      ],
      options: {
        name: "grid63405",
        hidden: false,
        gutter: 12,
        customClass: "",
      },
      id: "grid63405",
    },
    {
      type: "grid",
      category: "container",
      icon: "grid",
      cols: [
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "select",
              icon: "select-field",
              formItemFlag: true,
              options: {
                name: "select71837",
                label: "支付方式",
                labelAlign: "",
                defaultValue: "",
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: false,
                hidden: false,
                clearable: true,
                filterable: false,
                allowCreate: false,
                remote: false,
                automaticDropdown: false,
                multiple: false,
                multipleLimit: 0,
                optionItems: [
                  { value: "1", label: "微信" },
                  { value: "2", label: "支付宝" },
                  { value: "3", label: "其他" },
                ],
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                onCreated: "",
                onMounted: "",
                onRemoteQuery: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "select71837",
            },
          ],
          options: {
            name: "gridCol18846",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-18846",
        },
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "switch",
              icon: "switch-field",
              formItemFlag: true,
              options: {
                name: "switch35050",
                label: "是否需要发票",
                labelAlign: "",
                defaultValue: false,
                columnWidth: "200px",
                labelWidth: null,
                labelHidden: false,
                disabled: false,
                hidden: false,
                customClass: [],
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                switchWidth: 40,
                activeText: "需要",
                inactiveText: "不需要",
                activeColor: null,
                inactiveColor: null,
                onCreated: "",
                onMounted: "",
                onChange: "",
                onValidate: "",
              },
              id: "switch35050",
            },
          ],
          options: {
            name: "gridCol74079",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-74079",
        },
      ],
      options: {
        name: "grid82940",
        hidden: false,
        gutter: 12,
        customClass: "",
      },
      id: "grid82940",
    },
    {
      type: "grid",
      category: "container",
      icon: "grid",
      cols: [
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "select",
              icon: "select-field",
              formItemFlag: true,
              options: {
                name: "select78072",
                label: "物流快递",
                labelAlign: "",
                defaultValue: "",
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: false,
                hidden: false,
                clearable: true,
                filterable: false,
                allowCreate: false,
                remote: false,
                automaticDropdown: false,
                multiple: false,
                multipleLimit: 0,
                optionItems: [
                  { value: "1", label: "中国邮政" },
                  { value: "2", label: "顺丰" },
                  { value: "3", label: "申通" },
                  { value: "4", label: "中通" },
                  { value: "5", label: "韵达" },
                ],
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                onCreated: "",
                onMounted: "",
                onRemoteQuery: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "select78072",
            },
          ],
          options: {
            name: "gridCol14757",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-14757",
        },
      ],
      options: {
        name: "grid49116",
        hidden: false,
        gutter: 12,
        customClass: "",
      },
      id: "grid49116",
    },
    {
      type: "grid",
      category: "container",
      icon: "grid",
      cols: [
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "input",
              icon: "text-field",
              formItemFlag: true,
              options: {
                name: "input20247",
                label: "收货地址",
                labelAlign: "",
                type: "text",
                defaultValue: "",
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                showPassword: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                minLength: null,
                maxLength: null,
                showWordLimit: false,
                prefixIcon: "",
                suffixIcon: "",
                appendButton: false,
                appendButtonDisabled: false,
                buttonIcon: "el-icon-search",
                onCreated: "",
                onMounted: "",
                onInput: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "input20247",
            },
          ],
          options: {
            name: "gridCol10575",
            hidden: false,
            span: 24,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-10575",
        },
      ],
      options: {
        name: "grid30617",
        hidden: false,
        gutter: 12,
        customClass: "",
      },
      id: "grid30617",
    },
    {
      type: "card",
      category: "container",
      icon: "card",
      widgetList: [
        {
          type: "sub-form",
          category: "container",
          icon: "sub-form",
          widgetList: [
            {
              type: "select",
              icon: "select-field",
              formItemFlag: true,
              options: {
                name: "select27919",
                label: "购买产品",
                labelAlign: "",
                defaultValue: "",
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: false,
                hidden: false,
                clearable: true,
                filterable: false,
                allowCreate: false,
                remote: false,
                automaticDropdown: false,
                multiple: false,
                multipleLimit: 0,
                optionItems: [
                  { value: "p1", label: "苹果" },
                  { value: "p2", label: "菠萝" },
                  { value: "p3", label: "荔枝" },
                ],
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                onCreated: "",
                onMounted: "",
                onRemoteQuery: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "select27919",
            },
            {
              type: "input",
              icon: "text-field",
              formItemFlag: true,
              options: {
                name: "input37637",
                label: "型号/规格",
                labelAlign: "",
                type: "text",
                defaultValue: "",
                placeholder: "",
                columnWidth: "150px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                showPassword: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                minLength: null,
                maxLength: null,
                showWordLimit: false,
                prefixIcon: "",
                suffixIcon: "",
                appendButton: false,
                appendButtonDisabled: false,
                buttonIcon: "el-icon-search",
                onCreated: "",
                onMounted: "",
                onInput: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "input37637",
            },
            {
              type: "number",
              icon: "number-field",
              formItemFlag: true,
              options: {
                name: "number36803",
                label: "单价",
                labelAlign: "",
                defaultValue: 0,
                placeholder: "",
                columnWidth: "150px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: false,
                hidden: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                min: -100000000000,
                max: 100000000000,
                precision: 2,
                step: 1,
                controlsPosition: "right",
                onCreated: "",
                onMounted: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "number36803",
            },
            {
              type: "number",
              icon: "number-field",
              formItemFlag: true,
              options: {
                name: "number10017",
                label: "数量",
                labelAlign: "",
                defaultValue: 0,
                placeholder: "",
                columnWidth: "150px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: false,
                hidden: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                min: -100000000000,
                max: 100000000000,
                precision: 0,
                step: 1,
                controlsPosition: "right",
                onCreated: "",
                onMounted: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "number10017",
            },
            {
              type: "number",
              icon: "number-field",
              formItemFlag: true,
              options: {
                name: "number9464",
                label: "小计金额",
                labelAlign: "",
                defaultValue: 0,
                placeholder: "",
                columnWidth: "150px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: true,
                hidden: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                min: -100000000000,
                max: 100000000000,
                precision: 2,
                step: 1,
                controlsPosition: "right",
                onCreated: "",
                onMounted: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "number9464",
            },
          ],
          options: {
            name: "subform27823",
            showBlankRow: true,
            showRowNumber: true,
            labelAlign: "label-center-align",
            hidden: false,
            customClass: "",
            onSubFormRowAdd: "",
            onSubFormRowInsert: "",
            onSubFormRowDelete: "",
            onSubFormRowChange: "",
          },
          id: "subform27823",
        },
      ],
      options: {
        name: "card105958",
        label: "订单明细",
        hidden: false,
        folded: false,
        showFold: true,
        cardWidth: "100%",
        shadow: "never",
        customClass: [],
      },
      id: "card105958",
    },
    {
      type: "grid",
      category: "container",
      icon: "grid",
      cols: [
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "number",
              icon: "number-field",
              formItemFlag: true,
              options: {
                name: "number97501",
                label: "累计金额",
                labelAlign: "",
                defaultValue: 0,
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: true,
                hidden: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: [],
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                min: -100000000000,
                max: 100000000000,
                precision: 2,
                step: 1,
                controlsPosition: "right",
                onCreated: "",
                onMounted: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "number97501",
            },
          ],
          options: {
            name: "gridCol101404",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-101404",
        },
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "number",
              icon: "number-field",
              formItemFlag: true,
              options: {
                name: "number88459",
                label: "优惠金额",
                labelAlign: "",
                defaultValue: 0,
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: false,
                hidden: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: [],
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                min: -100000000000,
                max: 100000000000,
                precision: 2,
                step: 1,
                controlsPosition: "right",
                onCreated: "",
                onMounted: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "number88459",
            },
          ],
          options: {
            name: "gridCol42397",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: [],
          },
          id: "grid-col-42397",
        },
      ],
      options: {
        name: "grid47470",
        hidden: false,
        gutter: 12,
        customClass: "",
      },
      id: "grid47470",
    },
    {
      type: "grid",
      category: "container",
      icon: "grid",
      cols: [
        {
          type: "grid-col",
          category: "container",
          icon: "grid-col",
          internal: true,
          widgetList: [
            {
              type: "number",
              icon: "number-field",
              formItemFlag: true,
              options: {
                name: "number27788",
                label: "实付金额",
                labelAlign: "",
                defaultValue: 0,
                placeholder: "",
                columnWidth: "200px",
                size: "",
                labelWidth: null,
                labelHidden: false,
                disabled: false,
                hidden: false,
                required: false,
                validation: "",
                validationHint: "",
                customClass: "",
                labelIconClass: null,
                labelIconPosition: "rear",
                labelTooltip: null,
                min: -100000000000,
                max: 100000000000,
                precision: 2,
                step: 1,
                controlsPosition: "right",
                onCreated: "",
                onMounted: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onValidate: "",
              },
              id: "number27788",
            },
          ],
          options: {
            name: "gridCol71662",
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: "",
          },
          id: "grid-col-71662",
        },
      ],
      options: {
        name: "grid59881",
        hidden: false,
        gutter: 12,
        customClass: "",
      },
      id: "grid59881",
    },
    {
      key: 61822,
      type: "card",
      category: "container",
      icon: "card",
      widgetList: [],
      options: {
        name: "card13380",
        label: "card",
        hidden: false,
        folded: false,
        showFold: true,
        cardWidth: "100%",
        shadow: "never",
        customClass: "",
      },
      id: "card13380",
    },
  ],
  formConfig: {
    modelName: "formData",
    refName: "vForm",
    rulesName: "rules",
    labelWidth: 100,
    labelPosition: "left",
    size: "",
    labelAlign: "label-left-align",
    cssCode: "",
    customClass: [],
    functions: "",
    layoutType: "PC",
    jsonVersion: 3,
    onFormCreated: "",
    onFormMounted: "",
    onFormDataChange: "",
    onFormValidate: "",
  },
});
const formData = reactive({});
const optionData = reactive({});
const vFormRef = ref(null);

const submitForm1 = () => {
  vFormRef.value
    .getFormData()
    .then((formData) => {
      // Form Validation OK
      alert(JSON.stringify(formData));
    })
    .catch((error) => {
      // Form Validation failed
      ElMessage.error(error);
    });
};

const { proxy } = getCurrentInstance();
const { sys_yes_no } = proxy.useDict("sys_yes_no");

const configList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    configName: undefined,
    configKey: undefined,
    configType: undefined,
  },
  rules: {
    configName: [
      { required: true, message: "参数名称不能为空", trigger: "blur" },
    ],
    configKey: [
      { required: true, message: "参数键名不能为空", trigger: "blur" },
    ],
    configValue: [
      { required: true, message: "参数键值不能为空", trigger: "blur" },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询参数列表 */
function getList() {
  loading.value = true;
  listConfig(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      configList.value = response.rows;
      total.value = response.total;
      loading.value = false;
    }
  );
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

/** 表单重置 */
function reset() {
  form.value = {
    configId: undefined,
    configName: undefined,
    configKey: undefined,
    configValue: undefined,
    configType: "Y",
    remark: undefined,
  };
  proxy.resetForm("configRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.configId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加参数";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const configId = row.configId || ids.value;
  getConfig(configId).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改参数";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["configRef"].validate((valid) => {
    if (valid) {
      if (form.value.configId != undefined) {
        updateConfig(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addConfig(form.value).then((response) => {
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
  const configIds = row.configId || ids.value;
  proxy.$modal
    .confirm('是否确认删除参数编号为"' + configIds + '"的数据项？')
    .then(function () {
      return delConfig(configIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "system/config/export",
    {
      ...queryParams.value,
    },
    `config_${new Date().getTime()}.xlsx`
  );
}

/** 刷新缓存按钮操作 */
function handleRefreshCache() {
  refreshCache().then(() => {
    proxy.$modal.msgSuccess("刷新缓存成功");
  });
}

getList();
</script>
