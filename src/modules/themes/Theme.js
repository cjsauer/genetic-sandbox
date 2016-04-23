import ElementalTheme from "./ElementalTheme";

/**
 * The hub of all styling. Used to set the current theme, and retrieve styling
 * values like color, stroke thickness, etc.
 */
const Theme = {
  /**
   * This is where you can add new themes!
   * @private
   */
  _themes: {
    "elemental": ElementalTheme
  },

  /**
   * The currently selected theme from which you can get styling values
   * @example
   * let pepperoni = new Path.Circle(new Point(0, 0), 30);
   * pepperoni.style = Theme.current.pepperoniStyle;
   * @type {object}
   */
  current: undefined,

  /**
   * Sets the current theme
   * @example
   * Theme.setTheme("elemental");
   * @param {string} name - the name of the theme to use
   */
  setTheme(name) {
    this.current = this._themes[name];
  }
};

// The ElementalTheme is the default theme that ships with GS
Theme.setTheme("elemental");

export default Theme;
