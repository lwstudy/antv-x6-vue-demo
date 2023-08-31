export default {
  functional: true,
  props: {
    child: Object,
    border: Boolean,
    colon: Boolean,
    type: {
      type: String,
      validator(val) {
        return ['label', 'content'].includes(val)
      }
    },
    layout: {
      type: String,
      validator(val) {
        return ['horizontal', 'vertical'].includes(val)
      }
    }
  },
  render(h, context) {
    const {child, border, colon, type, layout} = context.props
    const {label, currentSpan = 1, key, labelAlign, contentAlign, labelStyle, contentStyle} = child
    const labelProps = {
      class: {
        'my-detail-item__label': true,
        'my-detail-item--colon': colon,
        [`is-${labelAlign}`]: !!labelAlign,
        'my-detail-item--no-label': !(child.$slots.label || label)
      },
      key: key,
      style: {
        ...labelStyle
      }
    }
    const contentProps = {
      style: {
        ...contentStyle
      }
    }
    if (layout === 'vertical') {
      labelProps.colspan = currentSpan * 2 - 1;
    }
    if (border) {
      if (type === 'label') {
        return (<th {...labelProps} colspan={labelProps.colspan}>{child.$slots.label || label}</th>)
      }
      return (
        <td {...contentProps} class={['my-detail-item__content', `is-${contentAlign}`]}
            key={key}
            colspan={currentSpan * 2 - 1} 
        >
          {child.$slots.default}
        </td>
      )
    }
    
    if (layout === 'vertical') {
      if (type === 'content') {
        return (
          <td {...contentProps} colspan={currentSpan} class={['my-detail-item__wrap', `is-${contentAlign}`]} key={key}>
          <span class="my-detail-item__content">
            {child.$slots.default}
          </span>
          </td>
        )
      }
      return (
        <td colspan={currentSpan} class={['my-detail-item__wrap', `is-${contentAlign}`]} key={key}>
        <span
          style={{...labelStyle}}
          class={{'my-detail-item__label': true, 'my-detail-item--colon': colon}}>
        {child.$slots.label || label}
        </span>
        </td>
      )
    }
    
    return (
      <td colspan={currentSpan} class="my-detail-item__wrap" key={key}>
        <span {...labelProps}>{child.$slots.label || label}</span>
        <span {...contentProps} class="my-detail-item__content">
       {child.$slots.default}
      </span>
      </td>
    )
    
  }
}
