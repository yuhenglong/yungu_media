<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="pageSize"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  components: {},
  props: {
    total: {
      type: Number
    }
  },
  data() {
    return {
      pageSize: [10, 20, 30, 40],
      page: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.$emit("pageChange", this.page);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.$emit("pageChange", this.page);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  height: 150px;
}
</style>
