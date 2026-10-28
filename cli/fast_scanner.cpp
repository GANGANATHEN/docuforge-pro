#include <iostream>
#include <filesystem>
#include <string>
#include <unordered_set>

namespace fs = std::filesystem;

const std::unordered_set<std::string> IGNORE_LIST = {
    ".git", "node_modules", "venv", ".venv", "build", "dist", ".next"
};

void scan_dir(const fs::path& path, int depth = 0) {
    try {
        for (const auto& entry : fs::directory_iterator(path)) {
            std::string name = entry.path().filename().string();
            if (IGNORE_LIST.find(name) != IGNORE_LIST.end()) continue;

            for (int i = 0; i < depth; ++i) std::cout << "  ";
            if (entry.is_directory()) {
                std::cout << "[DIR]  " << name << "\n";
                scan_dir(entry.path(), depth + 1);
            } else {
                std::cout << "[FILE] " << name << " (" << entry.file_size() << " bytes)\n";
            }
        }
    } catch (const std::exception& e) {
        // Silently ignore restricted folders
    }
}

int main(int argc, char* argv[]) {
    fs::path target = (argc > 1) ? argv[1] : ".";
    std::cout << "DocuForge Fast Scanner running on: " << target << "\n";
    scan_dir(target);
    return 0;
}