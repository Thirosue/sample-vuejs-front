<script>
import SingleSelectBox from '@/components/parts/form/mixin/SingleSelectBox'

export default {
  name: 'ViewCount',
  mixins: [SingleSelectBox],
  computed: {
    targetList: () => [{key:"10", value:'10件'},{key:"20", value:'20件'},{key:"50", value:'50件'},{key:"100", value:'100件'}],
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>