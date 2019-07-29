<template>
  <div class="headerSearch" :class="{ show:isShow }">
    <i class="el-icon-search icon" @click.stop="clickShow"></i>
    <el-select
      ref="headerSearch"
      v-model="value"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
      class="header-search-select"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "headerSearch",
  data() {
    return {
      isShow:false,
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ]
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  watch:{
    isShow(value){
      console.log('这是value',value);
      if(value){
        document.body.addEventListener('click',this.clickShow)
      }else{
        document.body.removeEventListener('click',this.clickShow)
      }
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    clickShow(){
      this.isShow = !this.isShow; 
      if(this.isShow){
        this.$refs.headerSearch.focus();
      }else{
        this.$refs.headerSearch.blur();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.headerSearch {
  display:inline-block;
  .icon {
    display: inline-block;
    padding: 17px 10px;
  }
  .icon:hover {
    cursor: pointer;
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
