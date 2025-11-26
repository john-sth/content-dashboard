// =========================================================================================================================
// Reference: https://www.digitalocean.com/community/tutorials/add-loading-indicators-to-your-vuejs-application 
// =========================================================================================================================

// This loader will add an overlay with the text of 'Loading...'
const Loader = {
  template: `
    <div class="{'is-loading': loading}">
      <slot/>
    </div>
  `,
  props: ['loading']
}



const Stats = {
  template: `
    <Loader :loading="updating">
      ...
    </Loader>
  `,
  props: ['updating']
}

export default Loader; Stats;