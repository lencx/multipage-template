default: help

install:
	npm install

# mode
dev:
	npm run dev
build:
	npm run build

# archiver
zip:
	node ./.bin/zip $(filter-out $@,$(MAKECMDGOALS))

clear:
	@echo "\033[35mDirectory name is required\033[0m"
	rm -rf $(filter-out $@,$(MAKECMDGOALS))

new:
	node ./.bin/new $(filter-out $@,$(MAKECMDGOALS))

mode:
	node ./.bin/mode $(filter-out $@,$(MAKECMDGOALS))

# command
cmd:
	@echo "\033[35m┌——————————————————————————————————————┐\033[0m"
	@echo "\033[35m|              webpack-cli             |\033[0m"
	@echo "\033[35m└——————————————————————————————————————┘\033[0m"
	npm run cli:help
	@echo "\033[35m┌——————————————————————————————————————┐\033[0m"
	@echo "\033[35m|           webpack-dev-server         |\033[0m"
	@echo "\033[35m└——————————————————————————————————————┘\033[0m"
	npm run dev:help

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明(Command instructions)\033[0m"
	@echo "   \033[35mmake install\033[0m \t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake new mode@<mode_name> <page_name>\033[0m\t---  新建模块或页面\n\033[0m\tmode_name: required\n\033[0m\texample: 'make new mode@aa' or 'make new mode@aa bb/c'"
	@echo "   \033[35mmake mode\033[0m   (model list)\t\033[0m\t\033[0m\t---  查看所有模块"
	@echo "   \033[35mmake mode <mode_name>\033[0m   (enable model)\033[0m\t---  启用某个或所有模块"
	@echo "   \033[35mmake cmd\033[0m (webpack-cli, webpack-dev-server)\033[0m\t---  帮助"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake build\033[0m\t\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译项目，生成目标文件"
	@echo "   \033[35mmake zip <version>\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译后的目标文件生成*.zip\n \033[0m\texample: 'make zip v1.2' -> '/pack/dist_v1.2.zip'"