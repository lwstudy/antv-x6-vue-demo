import Base from './Base'

export default {
  name: 'MyFormCustom',
  mixins: [Base],
  props: {},
  render() {
    const vnode = (
      <div class="my-form-custom">
        {this.$slots.default}
      </div>
    )
    return this.renderComponent(vnode)
  }
}
