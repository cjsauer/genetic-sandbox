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
   * let circle = new Path.Circle(new Point(0, 0), 30);
   * circle.style = Theme.current.backgroundStyle;
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
  },

  /**
   * Retrieves a [Paper.js item]{@link http://paperjs.org/reference/item/}
   * for the given sprite name as defined by the current theme, or the default
   * sprite if the given name is not defined
   * @param {string} name - name of the sprite
   * @param {PaperScope} paper - an active paper scope
   * @returns {Item} a Paper.js Item instance
   */
  getSprite(name, paper) {
    const sprites = this.current.sprites;
    const spriteFunc = sprites[name] ? sprites[name] : sprites["default"];
    return spriteFunc(paper);
  }
};

// The ElementalTheme is the default theme that ships with GS
Theme.setTheme("elemental");

export default Theme;
