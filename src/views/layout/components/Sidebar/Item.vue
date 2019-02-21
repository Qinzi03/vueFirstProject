<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isExpand: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const { icon, title, isExpand } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={ icon }/>)
    }

    if (isExpand && title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

