Themes
======

This directory contains themes, each in their own directory. Inside a theme directory you will have individual style
layers that are imported in `_theme.scss`. These layers only contain visual styles such as colors and borders.

There is also a `_settings.scss` containing theme settings such as colorscheme and theme specific site setting
overrides.

In order to include a theme into your stylesheet you must import `_settings.scss` at the top of your stylesheet, but
after your site settings and the global Cacao import. Then at the very end of your stylesheet import `_theme.scss`.



