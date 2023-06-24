#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let close = CustomMenuItem::new("close".to_string(), "Close");
  let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
  let edit = Submenu::new(
    "Edit",
    Menu::new()
      .add_native_item(MenuItem::Copy)
      .add_native_item(MenuItem::Paste),
  );
  let menu = Menu::new()
  .add_submenu(edit)
  .add_item(CustomMenuItem::new("hide".to_string(), "Hide"))
  .add_submenu(submenu);
  tauri::Builder::default()
    .menu(menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}