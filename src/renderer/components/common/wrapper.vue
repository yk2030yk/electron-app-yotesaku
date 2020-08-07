<template>
	<div class="wrapper">
    <sidebar />
		<div class="content">
      <common-header />
      <message-box />
			<slot></slot>
		</div>
	</div>
</template>

<script>
  import CommonHeader from '@/components/common/wrapper/CommonHeader'
  import MessageBox from '@/components/common/wrapper/MessageBox'
	import Sidebar from '@/components/common/wrapper/Sidebar'
	export default {
		components: {
      CommonHeader,
      MessageBox,
			Sidebar
		},
	}
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .content {
    width: 100%;
    height: 100%;
  }
</style>